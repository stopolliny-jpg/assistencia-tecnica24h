import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { errorResponse } from '../utils/apiResponse';
import { AdminUser } from '../modules/auth/admin.model';

export interface AuthRequest extends Request {
  admin?: any;
}

export const protectAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded: any = jwt.verify(token, env.JWT_SECRET);

      const admin = await AdminUser.findById(decoded.id).select('-passwordHash');
      
      if (!admin) {
        res.status(401);
        throw new Error('Not authorized, admin not found');
      }

      req.admin = admin;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};
