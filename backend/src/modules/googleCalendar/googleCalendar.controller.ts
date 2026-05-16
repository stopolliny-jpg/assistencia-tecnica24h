import { Request, Response } from 'express';
import { getGoogleOAuthClient } from '../../config/google';
import { GoogleIntegration } from './googleIntegration.model';
import { encrypt } from '../../utils/encryption';
import { successResponse, errorResponse } from '../../utils/apiResponse';
import { google } from 'googleapis';
import { env } from '../../config/env';

export const getAuthUrl = async (req: Request, res: Response) => {
  const oauth2Client = getGoogleOAuthClient();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    prompt: 'consent'
  });

  res.json(successResponse('URL de autorização gerada.', { authUrl }));
};

export const handleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    res.status(400);
    throw new Error('Código de autorização não fornecido.');
  }

  const oauth2Client = getGoogleOAuthClient();
  const { tokens } = await oauth2Client.getToken(code as string);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const userInfo = await oauth2.userinfo.get();

  // For this project, assuming single admin so we can just update or create
  // A real multi-tenant would use req.admin.id
  let integration = await GoogleIntegration.findOne();

  if (!integration) {
    // Fallback if we don't have req.admin available in callback (often happens if callback is generic)
    // We will assume the first admin
    const { AdminUser } = await import('../auth/admin.model');
    const admin = await AdminUser.findOne();
    if(!admin) throw new Error('No admin found to link Google Account');

    integration = new GoogleIntegration({ adminId: admin._id });
  }

  integration.googleEmail = userInfo.data.email || 'unknown';
  if (tokens.access_token) integration.accessTokenEncrypted = encrypt(tokens.access_token);
  if (tokens.refresh_token) integration.refreshTokenEncrypted = encrypt(tokens.refresh_token);
  if (tokens.expiry_date) integration.expiryDate = tokens.expiry_date;
  integration.isConnected = true;

  await integration.save();

  // Redirect to frontend success page
  res.redirect(`${env.ADMIN_URL}/google-integration?success=true`);
};

export const getStatus = async (req: Request, res: Response) => {
  const integration = await GoogleIntegration.findOne({ isConnected: true });

  if (!integration) {
    return res.json(successResponse('Status da integração.', { isConnected: false }));
  }

  res.json(successResponse('Status da integração.', {
    isConnected: true,
    googleEmail: integration.googleEmail,
    calendarId: integration.calendarId
  }));
};

export const disconnectGoogle = async (req: Request, res: Response) => {
  await GoogleIntegration.updateMany({}, { isConnected: false });
  res.json(successResponse('Google Calendar desconectado.'));
};

export const getCalendars = async (req: Request, res: Response) => {
  const integration = await GoogleIntegration.findOne({ isConnected: true });
  if (!integration) {
    res.status(400);
    throw new Error('Google Calendar não está conectado.');
  }

  const { getActiveGoogleIntegration } = await import('./googleCalendar.service');
  const active = await getActiveGoogleIntegration();
  if(!active) throw new Error('Failed to get active integration');

  const calendar = google.calendar({ version: 'v3', auth: active.oauth2Client });
  const calendarList = await calendar.calendarList.list();

  res.json(successResponse('Calendários listados.', calendarList.data.items));
};

export const updateCalendar = async (req: Request, res: Response) => {
  const { calendarId } = req.body;
  
  const integration = await GoogleIntegration.findOne({ isConnected: true });
  if (!integration) {
    res.status(400);
    throw new Error('Google Calendar não está conectado.');
  }

  integration.calendarId = calendarId;
  await integration.save();

  res.json(successResponse('Calendário atualizado.', { calendarId }));
};
