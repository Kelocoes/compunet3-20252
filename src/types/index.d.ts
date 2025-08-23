import { JwtPayload } from "jsonwebtoken";

type JwtCustomPayload = {
    id: string;
    roles: string[];
} & JwtPayload;

declare global { // Global scope to extend Express Request interface
    namespace Express { // Namespace to avoid conflicts
        interface Request { // Extend the Request interface
            user?: JwtCustomPayload;
        }
    }
}

export { JwtCustomPayload };
