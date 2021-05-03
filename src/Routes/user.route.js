import { Router } from "express";
import userController from "../Controllers/user.controller.js";
const router = Router();

router.post("", async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const response = await userController.create(user);
  if (response.status) {
    res.status(201).json(response.data);
  } else {
    res.status(400).json(response);
  }
});

export default router;
