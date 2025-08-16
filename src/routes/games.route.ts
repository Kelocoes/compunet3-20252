import express from "express";
import { gamesController } from "../controllers";

export const router = express.Router();

// Rutas adicionales (deben ir antes de las rutas con parámetros dinámicos)
router.get("/user/:userId", gamesController.getByUserId);
router.get("/genre/:genre", gamesController.getByGenre);

// Rutas CRUD básicas
router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getOne);
router.post("/", gamesController.create);
router.put("/:id", gamesController.update);
router.delete("/:id", gamesController.delete);
