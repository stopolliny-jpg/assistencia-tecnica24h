import { Request, Response } from 'express';
import { Quote } from './quote.model';
import { successResponse, errorResponse } from '../../utils/apiResponse';
import { buildWhatsappUrl } from '../../utils/buildWhatsappUrl';

export const createQuote = async (req: Request, res: Response) => {
  const quoteData = {
    ...req.body,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']
  };

  const quote = await Quote.create(quoteData);

  const whatsappUrl = buildWhatsappUrl({
    fullName: quote.fullName,
    whatsapp: quote.whatsapp,
    deviceModel: quote.deviceModel,
    problemType: quote.problemType,
    description: quote.description,
    date: quote.preferredDate || undefined,
    startTime: quote.preferredTime || undefined
  });

  res.status(201).json(successResponse('Orçamento recebido com sucesso.', {
    quote,
    whatsappUrl
  }));
};

// Admin Endpoints
export const getQuotes = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const status = req.query.status;
  const problemType = req.query.problemType;
  const search = req.query.search;

  const query: any = {};

  if (status) query.status = status;
  if (problemType) query.problemType = problemType;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { whatsapp: { $regex: search, $options: 'i' } },
      { deviceModel: { $regex: search, $options: 'i' } }
    ];
  }

  const quotes = await Quote.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Quote.countDocuments(query);

  res.json(successResponse('Orçamentos carregados.', {
    quotes,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  }));
};

export const getQuoteById = async (req: Request, res: Response) => {
  const quote = await Quote.findById(req.params.id).populate('bookingId');
  if (!quote) {
    res.status(404);
    throw new Error('Orçamento não encontrado');
  }
  res.json(successResponse('Orçamento carregado.', quote));
};

export const updateQuoteStatus = async (req: Request, res: Response) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) {
    res.status(404);
    throw new Error('Orçamento não encontrado');
  }

  quote.status = req.body.status;
  await quote.save();

  res.json(successResponse('Status atualizado.', quote));
};

export const deleteQuote = async (req: Request, res: Response) => {
  const quote = await Quote.findById(req.params.id);
  if (!quote) {
    res.status(404);
    throw new Error('Orçamento não encontrado');
  }

  await quote.deleteOne();
  res.json(successResponse('Orçamento removido.'));
};
