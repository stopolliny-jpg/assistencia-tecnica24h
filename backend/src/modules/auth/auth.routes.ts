import express from 'express';
import { registerAdmin, loginAdmin } from './auth.controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middlewares/validate'; // Needs to be created
import { registerSchema, loginSchema } from './auth.validation';

const router = express.Router();

router.post('/register', validate(registerSchema), asyncHandler(registerAdmin));
router.post('/login', validate(loginSchema), asyncHandler(loginAdmin));

export default router;
