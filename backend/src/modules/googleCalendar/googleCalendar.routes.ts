import express from 'express';
import { 
  getAuthUrl, 
  handleCallback, 
  getStatus, 
  disconnectGoogle, 
  getCalendars, 
  updateCalendar 
} from './googleCalendar.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { protectAdmin } from '../../middlewares/authAdmin';

const router = express.Router();

router.get('/auth-url', protectAdmin, asyncHandler(getAuthUrl));
router.get('/callback', asyncHandler(handleCallback)); // Usually public callback
router.get('/status', protectAdmin, asyncHandler(getStatus));
router.post('/disconnect', protectAdmin, asyncHandler(disconnectGoogle));
router.get('/calendars', protectAdmin, asyncHandler(getCalendars));
router.patch('/calendar', protectAdmin, asyncHandler(updateCalendar));

export default router;
