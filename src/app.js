import express from "express";
import routes from "./Routes/index.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

routes(app);

export default app;
