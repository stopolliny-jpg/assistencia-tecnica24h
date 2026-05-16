import { Request, Response } from 'express';
import { AvailabilitySlot } from './availability.model';
import { successResponse, errorResponse } from '../../utils/apiResponse';

export const getPublicAvailability = async (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error('Data é obrigatória');
  }

  const slots = await AvailabilitySlot.find({
    date,
    isAvailable: true,
    isBooked: false
  }).sort({ startTime: 1 }).select('id date startTime endTime');

  res.json(successResponse('Horários disponíveis carregados.', {
    date,
    slots
  }));
};

export const getAdminAvailability = async (req: Request, res: Response) => {
  const { date, startDate, endDate, isAvailable, isBooked } = req.query;
  const query: any = {};

  if (date) query.date = date;
  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }
  if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';
  if (isBooked !== undefined) query.isBooked = isBooked === 'true';

  const slots = await AvailabilitySlot.find(query).sort({ date: 1, startTime: 1 }).populate('bookingId');

  res.json(successResponse('Slots carregados.', slots));
};

export const generateSlots = async (req: Request, res: Response) => {
  const { date, startTime, endTime, durationMinutes, breakStart, breakEnd, notes } = req.body;

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const startMins = parseTime(startTime);
  const endMins = parseTime(endTime);
  const breakStartMins = breakStart ? parseTime(breakStart) : -1;
  const breakEndMins = breakEnd ? parseTime(breakEnd) : -1;

  const newSlots = [];

  for (let currentMins = startMins; currentMins + durationMinutes <= endMins; currentMins += durationMinutes) {
    const slotEndMins = currentMins + durationMinutes;

    // Check break
    if (breakStartMins !== -1 && breakEndMins !== -1) {
      if ((currentMins >= breakStartMins && currentMins < breakEndMins) || 
          (slotEndMins > breakStartMins && slotEndMins <= breakEndMins) ||
          (currentMins <= breakStartMins && slotEndMins >= breakEndMins)) {
        continue; // Skip this slot because it overlaps with break
      }
    }

    newSlots.push({
      date,
      startTime: formatTime(currentMins),
      endTime: formatTime(slotEndMins),
      durationMinutes,
      notes
    });
  }

  const createdSlots = [];
  const existingSlots = [];

  for (const slot of newSlots) {
    try {
      const created = await AvailabilitySlot.create(slot);
      createdSlots.push(created);
    } catch (error: any) {
      if (error.code === 11000) {
        existingSlots.push(slot);
      } else {
        throw error;
      }
    }
  }

  res.status(201).json(successResponse(`${createdSlots.length} slots criados.`, {
    created: createdSlots,
    skippedDuplicates: existingSlots.length
  }));
};

export const updateSlot = async (req: Request, res: Response) => {
  const { isAvailable, notes } = req.body;
  const slot = await AvailabilitySlot.findById(req.params.id);

  if (!slot) {
    res.status(404);
    throw new Error('Slot não encontrado');
  }

  if (isAvailable !== undefined) slot.isAvailable = isAvailable;
  if (notes !== undefined) slot.notes = notes;

  await slot.save();

  res.json(successResponse('Slot atualizado.', slot));
};

export const deleteSlot = async (req: Request, res: Response) => {
  const slot = await AvailabilitySlot.findById(req.params.id);

  if (!slot) {
    res.status(404);
    throw new Error('Slot não encontrado');
  }

  if (slot.isBooked) {
    res.status(400);
    throw new Error('Não é possível apagar um slot já reservado.');
  }

  await slot.deleteOne();

  res.json(successResponse('Slot removido.'));
};

export const deleteSlotsByDay = async (req: Request, res: Response) => {
  const { date } = req.params;

  const result = await AvailabilitySlot.deleteMany({
    date,
    isBooked: false
  });

  res.json(successResponse(`Removidos ${result.deletedCount} slots livres. Slots reservados foram mantidos.`));
};
