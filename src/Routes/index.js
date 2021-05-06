import { Router } from "express";
import swaggerRouter from "./swagger.route.js";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import bookRoute from "./book.route.js";
const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

export default (app) => {
  app.use(rootRouter);
  app.use("/swagger", swaggerRouter);
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/book", bookRoute);
};
