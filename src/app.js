import express from "express";
import {db} from "./database/db.js";
import routes from "./Routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

routes(app);


export default app;
