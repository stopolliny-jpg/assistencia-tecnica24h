import { Request, Response } from 'express';
import { AdminUser } from './admin.model';
import { successResponse, errorResponse } from '../../utils/apiResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

const generateToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const registerAdmin = async (req: Request, res: Response) => {
  const adminCount = await AdminUser.countDocuments({});
  if (adminCount > 0) {
    return res.status(403).json(errorResponse('Administrador já foi criado.'));
  }

  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const admin = await AdminUser.create({
    name,
    email,
    passwordHash
  });

  if (admin) {
    res.status(201).json(successResponse('Admin registrado com sucesso.', {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }));
  } else {
    res.status(400);
    throw new Error('Dados de admin inválidos');
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin: any = await AdminUser.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json(successResponse('Login realizado com sucesso.', {
      token: generateToken(admin._id.toString()),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    }));
  } else {
    res.status(401);
    throw new Error('Email ou senha inválidos');
  }
};
