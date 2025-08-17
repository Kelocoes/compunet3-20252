import express, { Request, Response } from "express";
import { userController } from "../controllers";
import { userValidations } from "../validators";
import { authMiddleware } from "../middlewares";

export const router = express.Router();

router.get("/", authMiddleware, userController.getAll);

router.get("/:id", userValidations.id, userController.getOne);

router.put("/:id", userValidations.id, userValidations.update, userController.update);

router.post("/", userValidations.create, userController.create);

router.delete("/:id", userValidations.id, userController.delete);