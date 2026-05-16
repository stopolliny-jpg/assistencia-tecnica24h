import express from 'express';
import { createQuote, getQuotes, getQuoteById, updateQuoteStatus, deleteQuote } from './quote.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middlewares/validate';
import { createQuoteSchema } from './quote.validation';
import { protectAdmin } from '../../middlewares/authAdmin';
import { strictLimiter } from '../../middlewares/rateLimiter';

const router = express.Router();
const adminRouter = express.Router();

// Public
router.post('/', strictLimiter, validate(createQuoteSchema), asyncHandler(createQuote));

// Admin
adminRouter.use(protectAdmin);
adminRouter.get('/', asyncHandler(getQuotes));
adminRouter.get('/:id', asyncHandler(getQuoteById));
adminRouter.patch('/:id/status', asyncHandler(updateQuoteStatus));
adminRouter.delete('/:id', asyncHandler(deleteQuote));

// Export router for public use, and adminRouter for admin use
export default router;
export { adminRouter as admin };
