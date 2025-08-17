import { Request, Response } from "express";
import { UserDocument } from "../models";
import { userService } from "../services";
import { UserInput, UserInputUpdate, UserLoginInput } from "../interfaces";
import { AppError } from "../middlewares";
import { authService } from "../services";

class AuthController {
    public async login(req: Request, res: Response, next: Function) {
        try {
            const token = await authService.login(req.body as UserLoginInput);
            res.json({ token });
        } catch (error) {
            if (error instanceof AppError) {
                return next(error);
            } else if (error instanceof ReferenceError) {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const authController = new AuthController();