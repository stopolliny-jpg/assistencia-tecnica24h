import express from 'express';
import { getSiteConfig, updateSiteConfig } from './siteConfig.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { protectAdmin } from '../../middlewares/authAdmin';

const router = express.Router();

router.get('/', asyncHandler(getSiteConfig));
router.patch('/', protectAdmin, asyncHandler(updateSiteConfig));

export default router;
