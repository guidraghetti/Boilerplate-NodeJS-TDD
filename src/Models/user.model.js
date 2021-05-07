import { mongoose as db } from "../database/db.js";
const Schema = db.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: {
    type: [{ type: Schema.Types.ObjectId, ref: "book" }],
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
});
const User = db.model("user", UserSchema);

export default User;
