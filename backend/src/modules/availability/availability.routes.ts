import express from 'express';
import { 
  getPublicAvailability, 
  getAdminAvailability, 
  generateSlots, 
  updateSlot, 
  deleteSlot, 
  deleteSlotsByDay 
} from './availability.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { protectAdmin } from '../../middlewares/authAdmin';
import { validate } from '../../middlewares/validate';
import { generateSlotsSchema } from './availability.validation';

const publicRouter = express.Router();
const adminRouter = express.Router();

// Public
publicRouter.get('/', asyncHandler(getPublicAvailability));

// Admin
adminRouter.use(protectAdmin);
adminRouter.get('/', asyncHandler(getAdminAvailability));
adminRouter.post('/generate', validate(generateSlotsSchema), asyncHandler(generateSlots));
adminRouter.patch('/:id', asyncHandler(updateSlot));
adminRouter.delete('/:id', asyncHandler(deleteSlot));
adminRouter.delete('/day/:date', asyncHandler(deleteSlotsByDay));

export default {
  public: publicRouter,
  admin: adminRouter
};
