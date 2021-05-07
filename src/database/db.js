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

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${
  NODE_ENV === "test" ? MONGO_DATABASE_TEST : MONGO_DATABASE
}?retryWrites=true&w=majority`;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(url, dbOptions, (err, good) => {
  if (err) {
    console.log(err);
  } else {
    NODE_ENV === "test" ? "" : console.log("Database is connected!");
  }
});

export { mongoose as db, dbOptions, url };
