import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserLoginInput, UserLoginOutput } from "../interfaces";
import { UserDocument } from "../models";
import { userService } from "./user.service";

class AuthService {
    public async login(userLogin: UserLoginInput): Promise<UserLoginOutput> {
        const userExists: UserDocument | null = await userService.findByEmail(userLogin.email, true);
        if (userExists === null) {
            throw new ReferenceError("Not Authorized");
        }

        const isMatch: boolean = await bcrypt.compare(userLogin.password, userExists.password);

        if (!isMatch) {
            throw new ReferenceError("Not Authorized");
        }

        return {
            id: userExists.id,
            roles: userExists.roles,
            token: await this.generateToken(userExists)
        };
    }

    public async generateToken(user: UserDocument): Promise<string> {
        const payload = {
            id: user.id,
            roles: user.roles
        };
        return jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '1h' });
    }

}

export const authService = new AuthService();