import express from 'express';
import { getDashboardStats } from './stats.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { protectAdmin } from '../../middlewares/authAdmin';

const router = express.Router();

router.get('/', protectAdmin, asyncHandler(getDashboardStats));

export default router;
