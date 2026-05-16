import { Request, Response } from 'express';
import { Feedback } from './feedback.model';
import { successResponse } from '../../utils/apiResponse';

export const getPublicFeedbacks = async (req: Request, res: Response) => {
  const feedbacks = await Feedback.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 });

  res.json(successResponse('Feedbacks carregados.', feedbacks));
};

export const getAdminFeedbacks = async (req: Request, res: Response) => {
  const feedbacks = await Feedback.find().sort({ order: 1, createdAt: -1 });
  res.json(successResponse('Feedbacks carregados.', feedbacks));
};

export const createFeedback = async (req: Request, res: Response) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json(successResponse('Feedback criado.', feedback));
};

export const updateFeedback = async (req: Request, res: Response) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!feedback) {
    res.status(404);
    throw new Error('Feedback não encontrado');
  }
  res.json(successResponse('Feedback atualizado.', feedback));
};

export const deleteFeedback = async (req: Request, res: Response) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404);
    throw new Error('Feedback não encontrado');
  }
  await feedback.deleteOne();
  res.json(successResponse('Feedback removido.'));
};
