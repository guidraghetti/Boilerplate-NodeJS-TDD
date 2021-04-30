import { Router } from "express";
import swaggerRouter from "./swagger.route.js";

const rootRouter = Router();

rootRouter.get("/", async (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

export default (app) => {
  app.use(rootRouter);
  app.use("/swagger", swaggerRouter);
};
