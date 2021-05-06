import { Router } from "express";
import bookController from "../Controllers/book.controller.js";
import auth from "../Middleware/authorization.js";

const router = Router();

router.get("/:id", auth, bookController.getUserOwnedBooks);
router.post("/post", auth, bookController.postUserBook);

export default router;
