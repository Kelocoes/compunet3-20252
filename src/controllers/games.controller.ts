import { Request, Response } from "express";
import { GameDocument } from "../models";
import { gamesService } from "../services";
import { GameInput, GameInputUpdate } from "../interfaces";

class GamesController {
    public async create(req: Request, res: Response) {
        try {
            const newGame: GameDocument = await gamesService.create(req.body as GameInput);
            res.status(201).json(newGame);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "User not found" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const games: GameDocument[] = await gamesService.getAll();
            res.json(games);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const game: GameDocument | null = await gamesService.getById(id);
            if (game === null) {
                res.status(404).json({ message: `Game with id ${id} not found` });
                return;
            }
            res.json(game);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const game: GameDocument | null = await gamesService.update(id, req.body as GameInputUpdate);
            if (game === null) {
                res.status(404).json({ message: `Game with id ${id} not found` });
                return;
            }
            res.json(game);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const deleted: boolean = await gamesService.delete(id);
            if (!deleted) {
                res.status(404).json({ message: `Game with id ${id} not found` });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getByUserId(req: Request, res: Response) {
        try {
            const userId: string = req.params.userId || "";
            const games: GameDocument[] = await gamesService.getByUserId(userId);
            res.json(games);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getByGenre(req: Request, res: Response) {
        try {
            const genre: string = req.params.genre || "";
            const games: GameDocument[] = await gamesService.getByGenre(genre);
            res.json(games);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const gamesController = new GamesController();
