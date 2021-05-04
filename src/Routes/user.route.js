import { Router } from "express";
import userController from "../Controllers/user.controller.js";
import auth from "../Middleware/authorization.js";

const router = Router();

router.get("/getAll", auth, userController.getAll);
router.get("/:id", auth, userController.getById);

export default router;
