import { z } from 'zod';

export const generateSlotsSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
    durationMinutes: z.number().min(10).max(180),
    breakStart: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional().nullable(),
    breakEnd: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional().nullable(),
    notes: z.string().optional()
  })
});
