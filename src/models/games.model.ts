import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface GameDocument extends mongoose.Document {
    title: string;
    genre: string;
    releaseDate: Date;
    createdBy: UserDocument;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, collection: 'games' });

export const GameModel = mongoose.model<GameDocument>("Game", gameSchema);