import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';
import { ZodError } from 'zod';
import { env } from '../config/env';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    message = 'Database Validation Error';
    errors = Object.values(err.errors).map((e: any) => e.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: env.NODE_ENV === 'production' ? errors : (errors.length ? errors : [err.stack])
  });
};
