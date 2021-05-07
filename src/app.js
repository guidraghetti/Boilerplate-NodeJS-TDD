import express from "express";
import { db } from "./database/db.js";
import routes from "./Routes/index.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
db();
routes(app);

export default app;
