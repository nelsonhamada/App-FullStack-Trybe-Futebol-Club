import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    role: string;
  }
}

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static validateFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length <= 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const jwtSecret = process.env.JWT_SECRET || 'padrao';

    try {
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
      const token = authorization.split(' ')[1];
      const decode = jwt.verify(token, jwtSecret) as JwtPayload;

      res.status(200).json(decode.role);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
}
