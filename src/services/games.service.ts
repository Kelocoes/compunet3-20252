import { GameInput, GameInputUpdate } from "../interfaces";
import { GameDocument, GameModel } from "../models";
import { UserModel } from "../models";

class GamesService {
    public async create(gameInput: GameInput): Promise<GameDocument> {
        // Verificar que el usuario que crea el juego existe
        const userExists = await UserModel.findById(gameInput.createdBy);
        if (!userExists) {
            throw new ReferenceError("User not found");
        }

        return GameModel.create(gameInput);
    }

    public async update(id: string, gameInput: GameInputUpdate): Promise<GameDocument | null> {
        try {
            const game: GameDocument | null = await GameModel.findOneAndUpdate(
                { _id: id },
                gameInput,
                { returnOriginal: false }
            );

            return game;
        } catch (error) {
            throw error;
        }
    }

    public getAll(): Promise<GameDocument[]> {
        return GameModel.find().populate('createdBy', 'name email');
    }

    public getById(id: string): Promise<GameDocument | null> {
        return GameModel.findById(id).populate('createdBy', 'name email');
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await GameModel.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            throw error;
        }
    }

    public getByUserId(userId: string): Promise<GameDocument[]> {
        return GameModel.find({ createdBy: userId }).populate('createdBy', 'name email');
    }

    public getByGenre(genre: string): Promise<GameDocument[]> {
        return GameModel.find({ genre: { $regex: genre, $options: 'i' } }).populate('createdBy', 'name email');
    }
}

export const gamesService = new GamesService();
