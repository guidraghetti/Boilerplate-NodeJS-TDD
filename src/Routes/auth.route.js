import { Router } from "express";
import authController from "../Controllers/auth.controller.js";

const router = Router();

router.post("/login", authController.login);

router.post("/register", authController.create);


export default router;
