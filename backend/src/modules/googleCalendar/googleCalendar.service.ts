import { google } from 'googleapis';
import { GoogleIntegration } from './googleIntegration.model';
import { getGoogleOAuthClient } from '../../config/google';
import { decrypt, encrypt } from '../../utils/encryption';

export const getActiveGoogleIntegration = async () => {
  const integration = await GoogleIntegration.findOne({ isConnected: true });
  if (!integration) return null;

  const oauth2Client = getGoogleOAuthClient();
  oauth2Client.setCredentials({
    access_token: decrypt(integration.accessTokenEncrypted),
    refresh_token: decrypt(integration.refreshTokenEncrypted),
    expiry_date: integration.expiryDate,
  });

  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.refresh_token) {
      integration.refreshTokenEncrypted = encrypt(tokens.refresh_token);
    }
    if (tokens.access_token) {
      integration.accessTokenEncrypted = encrypt(tokens.access_token);
    }
    if (tokens.expiry_date) {
      integration.expiryDate = tokens.expiry_date;
    }
    await integration.save();
  });

  return { oauth2Client, calendarId: integration.calendarId };
};

export const createCalendarEvent = async (booking: any) => {
  try {
    const integration = await getActiveGoogleIntegration();
    if (!integration) return null;

    const calendar = google.calendar({ version: 'v3', auth: integration.oauth2Client });

    const startDateTime = `${booking.date}T${booking.startTime}:00-03:00`;
    const endDateTime = `${booking.date}T${booking.endTime}:00-03:00`;

    const event = {
      summary: `Assistência Apple 24H - ${booking.fullName} - ${booking.deviceModel}`,
      description: `Cliente: ${booking.fullName}\nWhatsApp: ${booking.whatsapp}\nAparelho: ${booking.deviceModel}\nProblema: ${booking.problemType}\nDescrição: ${booking.description || 'Nenhuma'}\n\nAgendamento feito pelo site da Assistência Apple 24H.`,
      start: { dateTime: startDateTime, timeZone: 'America/Sao_Paulo' },
      end: { dateTime: endDateTime, timeZone: 'America/Sao_Paulo' },
    };

    const response = await calendar.events.insert({
      calendarId: integration.calendarId,
      requestBody: event,
    });

    return {
      googleCalendarEventId: response.data.id,
      googleCalendarHtmlLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return null;
  }
};

export const deleteCalendarEvent = async (eventId: string) => {
  try {
    const integration = await getActiveGoogleIntegration();
    if (!integration) return false;

    const calendar = google.calendar({ version: 'v3', auth: integration.oauth2Client });

    await calendar.events.delete({
      calendarId: integration.calendarId,
      eventId: eventId,
    });

    return true;
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error);
    return false;
  }
};
