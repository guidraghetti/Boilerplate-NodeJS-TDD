import { Router } from "express";
import swaggerRouter from "./swagger.route.js";
import authRoute from "./auth.route.js";

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
};
