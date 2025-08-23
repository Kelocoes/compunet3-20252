import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtCustomPayload } from '../types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Suponemos que es de tipo Bearer

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'defaultSecret';
        const decoded = jwt.verify(token, secretKey) as JwtCustomPayload;
        req.user = decoded; // Falla inicialmente por que user no está definido en Request
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};