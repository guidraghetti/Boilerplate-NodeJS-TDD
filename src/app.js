import express from "express";
import db from "./database/db";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

export default app;
