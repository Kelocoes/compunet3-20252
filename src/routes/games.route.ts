import express from "express";
import { gamesController } from "../controllers";
import { gameValidations } from "../validators";

export const router = express.Router();

router.get("/user/:userId", gameValidations.userId, gamesController.getByUserId);
router.get("/genre/:genre", gamesController.getByGenre);

router.get("/", gamesController.getAll);
router.get("/:id", gameValidations.id, gamesController.getOne);
router.post("/", gameValidations.create, gamesController.create);
router.put("/:id", gameValidations.id, gameValidations.update, gamesController.update);
router.delete("/:id", gameValidations.id, gamesController.delete);
