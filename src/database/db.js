import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
config();

const uri =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI_DEV;
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(uri, dbConfig, () => {
  process.env.NODE_ENV === "test" ? "" : console.log("Database is connected");
});
export { mongoose as db, dbConfig };
