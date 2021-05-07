import mongoose from "mongoose";
import { config } from "dotenv";
config();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_DATABASE_TEST,
  NODE_ENV,
} = process.env;

const url = `mongodb://${MONGO_HOST}:${27017}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const db = () => {
  mongoose.connect(url, options, (err, good) => {
    if (err) {
      console.log(err);
    } else {
      NODE_ENV === "test" ? "" : console.log("Database is connected!");
    }
  });
};

export { db, mongoose };
