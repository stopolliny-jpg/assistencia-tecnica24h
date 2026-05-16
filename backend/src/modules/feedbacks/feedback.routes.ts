import express from 'express';
import { 
  getPublicFeedbacks, 
  getAdminFeedbacks, 
  createFeedback, 
  updateFeedback, 
  deleteFeedback 
} from './feedback.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { protectAdmin } from '../../middlewares/authAdmin';
import { validate } from '../../middlewares/validate';
import { feedbackSchema } from './feedback.validation';

const publicRouter = express.Router();
const adminRouter = express.Router();

// Public
publicRouter.get('/', asyncHandler(getPublicFeedbacks));

// Admin
adminRouter.use(protectAdmin);
adminRouter.get('/', asyncHandler(getAdminFeedbacks));
adminRouter.post('/', validate(feedbackSchema), asyncHandler(createFeedback));
adminRouter.patch('/:id', validate(feedbackSchema), asyncHandler(updateFeedback));
adminRouter.delete('/:id', asyncHandler(deleteFeedback));

export default {
  public: publicRouter,
  admin: adminRouter
};
