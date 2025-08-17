import mongoose from "mongoose";
import { UserInput } from "../interfaces";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
    roles: UserRole[];
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    roles: { type: [String], enum: Object.values(UserRole), default: [UserRole.USER] },
    deletedAt: { type: Date, default: null }
}, { timestamps: true, collection: 'users' });

export const UserModel = mongoose.model<UserDocument>("User", userSchema);