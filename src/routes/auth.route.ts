import express from "express";
import { authController } from "../controllers";

export const router = express.Router();

router.post("/login", authController.login);
