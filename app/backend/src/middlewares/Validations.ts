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
    const messageError = 'All fields must be filled';

    if (!email) {
      return res.status(400).json({ message: messageError });
    }

    if (!password) {
      return res.status(400).json({ message: messageError });
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
      if (req.originalUrl === '/login/role') return res.status(200).json({ role: decode.role });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static async validateScoreboard(req: Request, res: Response, next: NextFunction) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }
}
