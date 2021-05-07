import { mongoose as db } from "../database/db.js";
const Schema = db.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["own", "like"],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Book = db.model("book", bookSchema);

export default Book;
