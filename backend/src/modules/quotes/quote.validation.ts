import { z } from 'zod';

const problemTypes = [
  'Tela quebrada',
  'Bateria ruim',
  'Não carrega',
  'Caiu na água',
  'Problema no áudio',
  'Problema na câmera',
  'Travando ou lento',
  'Outro problema'
] as const;

export const createQuoteSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    whatsapp: z.string().min(10, 'WhatsApp must be at least 10 numbers'),
    deviceModel: z.string().min(1, 'Device model is required'),
    problemType: z.enum(problemTypes, {
      errorMap: () => ({ message: 'Invalid problem type' })
    }),
    description: z.string().max(1000).optional(),
    preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)').optional(),
    preferredTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)').optional(),
    source: z.string().optional(),
    pageUrl: z.string().optional()
  })
});
