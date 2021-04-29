import app from "./app";
import { config } from "dotenv";
config();


app.listen(process.env.PORT, () => {
  NODE_ENV === "test"
    ? ""
    : console.log(`API is running on PORT ${process.env.PORT}`);
});
