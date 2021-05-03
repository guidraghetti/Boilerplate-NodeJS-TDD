import { db } from "../database/db.js";
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
  createdAt: {
    type: Date,
    required: true,
    default: new Date().toISOString(),
  },
});
const User = db.model("user", UserSchema);

export default User;
