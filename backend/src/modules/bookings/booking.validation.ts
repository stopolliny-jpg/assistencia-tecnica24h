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

export const quoteWithBookingSchema = z.object({
  body: z.object({
    slotId: z.string().length(24, 'Invalid slot ID'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    whatsapp: z.string().min(10, 'WhatsApp must be at least 10 numbers'),
    deviceModel: z.string().min(1, 'Device model is required'),
    problemType: z.enum(problemTypes),
    description: z.string().max(1000).optional(),
    source: z.string().optional(),
    pageUrl: z.string().optional()
  })
});
