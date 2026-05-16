import express from 'express';
import { 
  createQuoteWithBooking, 
  getBookings, 
  getBookingById, 
  updateBookingStatus, 
  cancelBooking, 
  deleteBooking 
} from './booking.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middlewares/validate';
import { quoteWithBookingSchema } from './booking.validation';
import { protectAdmin } from '../../middlewares/authAdmin';
import { strictLimiter } from '../../middlewares/rateLimiter';

const publicRouter = express.Router();
const adminRouter = express.Router();

// Public
publicRouter.post('/', strictLimiter, validate(quoteWithBookingSchema), asyncHandler(createQuoteWithBooking));

// Admin
adminRouter.use(protectAdmin);
adminRouter.get('/', asyncHandler(getBookings));
adminRouter.get('/:id', asyncHandler(getBookingById));
adminRouter.patch('/:id/status', asyncHandler(updateBookingStatus));
adminRouter.patch('/:id/cancel', asyncHandler(cancelBooking));
adminRouter.delete('/:id', asyncHandler(deleteBooking));

export default {
  public: publicRouter,
  admin: adminRouter
};
