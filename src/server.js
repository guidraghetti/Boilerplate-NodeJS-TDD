import app from "./app.js";
import { config } from "dotenv";
config();


app.listen(process.env.PORT, () => {
  process.env.NODE_ENV === "test"
    ? ""
    : console.log(`API is running on PORT ${process.env.PORT}`);
});
