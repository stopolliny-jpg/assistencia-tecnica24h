import { Request, Response } from 'express';
import { Booking } from './booking.model';
import { Quote } from '../quotes/quote.model';
import { AvailabilitySlot } from '../availability/availability.model';
import { successResponse, errorResponse } from '../../utils/apiResponse';
import { buildWhatsappUrl } from '../../utils/buildWhatsappUrl';
import { createCalendarEvent, deleteCalendarEvent } from '../googleCalendar/googleCalendar.service';

export const createQuoteWithBooking = async (req: Request, res: Response) => {
  const { slotId, fullName, whatsapp, deviceModel, problemType, description, source, pageUrl } = req.body;

  // 1. Atomic reservation of the slot
  const slot = await AvailabilitySlot.findOneAndUpdate(
    { _id: slotId, isAvailable: true, isBooked: false },
    { isBooked: true },
    { new: true }
  );

  if (!slot) {
    res.status(400);
    throw new Error('Horário indisponível ou já reservado.');
  }

  // 2. Create Quote
  const quote = await Quote.create({
    fullName,
    whatsapp,
    deviceModel,
    problemType,
    description,
    status: 'scheduled',
    source,
    pageUrl,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    preferredDate: slot.date,
    preferredTime: slot.startTime
  });

  // 3. Create Booking
  const booking = await Booking.create({
    fullName,
    whatsapp,
    deviceModel,
    problemType,
    description,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    slotId: slot._id,
    quoteId: quote._id,
    status: 'scheduled'
  });

  // 4. Update Slot and Quote with relationships
  slot.bookingId = booking._id as any;
  await slot.save();

  quote.bookingId = booking._id as any;
  await quote.save();

  // 5. Create Google Calendar Event
  const calendarEvent = await createCalendarEvent(booking);
  
  let googleCalendarSynced = false;
  let googleCalendarWarning = null;

  if (calendarEvent) {
    booking.googleCalendarEventId = calendarEvent.googleCalendarEventId;
    booking.googleCalendarHtmlLink = calendarEvent.googleCalendarHtmlLink;
    booking.googleCalendarSynced = true;
    slot.googleCalendarEventId = calendarEvent.googleCalendarEventId;
    
    await booking.save();
    await slot.save();
    googleCalendarSynced = true;
  } else {
    googleCalendarWarning = "Agendamento salvo no painel, mas Google Agenda não está conectado ou ocorreu um erro.";
    booking.googleCalendarWarning = googleCalendarWarning;
    await booking.save();
  }

  // 6. Return response and Whatsapp URL
  const whatsappUrl = buildWhatsappUrl({
    fullName,
    whatsapp,
    deviceModel,
    problemType,
    description,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime
  });

  res.status(201).json(successResponse('Orçamento e agendamento recebidos com sucesso.', {
    quote,
    booking,
    whatsappUrl,
    googleCalendarSynced,
    warning: googleCalendarWarning
  }));
};

export const getBookings = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const { date, status, search } = req.query;

  const query: any = {};

  if (date) query.date = date;
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { whatsapp: { $regex: search, $options: 'i' } },
      { deviceModel: { $regex: search, $options: 'i' } }
    ];
  }

  const bookings = await Booking.find(query)
    .sort({ date: 1, startTime: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Booking.countDocuments(query);

  res.json(successResponse('Agendamentos carregados.', {
    bookings,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  }));
};

export const getBookingById = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id).populate('quoteId slotId');
  if (!booking) {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }
  res.json(successResponse('Agendamento carregado.', booking));
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }

  booking.status = req.body.status;
  await booking.save();

  res.json(successResponse('Status atualizado.', booking));
};

export const cancelBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }

  // Update Booking
  booking.status = 'cancelled';
  await booking.save();

  // Free Slot
  const slot = await AvailabilitySlot.findById(booking.slotId);
  if (slot) {
    slot.isBooked = false;
    slot.bookingId = undefined;
    await slot.save();
  }

  // Cancel Event in Google Calendar
  if (booking.googleCalendarEventId) {
    await deleteCalendarEvent(booking.googleCalendarEventId);
  }

  res.json(successResponse('Agendamento cancelado com sucesso.'));
};

export const deleteBooking = async (req: Request, res: Response) => {
  // It's recommended to use cancel instead of delete.
  res.status(400);
  throw new Error('Por favor, cancele o agendamento em vez de deletar para manter o histórico e liberar a agenda corretamente.');
};
