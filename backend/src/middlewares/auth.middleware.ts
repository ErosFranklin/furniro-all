import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from './http-exception.middleware.js';

const JWT_SECRET = process.env['JWT_SECRET']!;

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
        return next(new UnauthorizedException("Not authenticated"));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch {
        next(new UnauthorizedException("Invalid or expired token"));
    }
}