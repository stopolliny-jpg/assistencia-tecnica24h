import { z } from 'zod';

export const feedbackSchema = z.object({
  body: z.object({
    clientName: z.string().min(2, 'Name is required'),
    videoUrl: z.string().url('Invalid video URL'),
    thumbnailUrl: z.string().url('Invalid thumbnail URL').optional().or(z.literal('')),
    description: z.string().max(500, 'Description max 500 chars').optional(),
    rating: z.number().min(1).max(5).optional(),
    isActive: z.boolean().optional(),
    order: z.number().optional()
  })
});
