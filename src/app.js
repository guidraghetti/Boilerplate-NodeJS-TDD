import express from "express";
import routes from "./Routes/index.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


routes(app);

export default app;
