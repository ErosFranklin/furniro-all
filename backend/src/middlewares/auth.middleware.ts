import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestException } from './http-exception.middleware.js';

const JWT_SECRET: string = process.env['JWT_SECRET'] ?? (() => { throw new Error('JWT_SECRET is not defined') })();
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

export interface AuthRequest extends Request {
    user?: { id: string; email: string };
}

export const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token){
        return next(new BadRequestException('No token provided'));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        req.user = payload;
        next();
    } catch {
        next(new BadRequestException('Invalid or expired token'));
    }
};
