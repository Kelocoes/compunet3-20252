import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models";

export const checkRole = (requiredRole: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user || !user.roles || !Array.isArray(user.roles)) {
            return res.status(403).json({ message: "Access denied. No roles found." });
        }

        if (!user.roles.includes(requiredRole)) {
            return res.status(403).json({ message: `Access denied.` });
        }

        next();
    };
};