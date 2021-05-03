import { hashSync } from "bcrypt";
import { User } from "../Models/user.model.js";

const userService = {};

userService.save = async (name, email, password) => {
  const newUser = new User({
    name,
    email,
    password: hashSync(password, 10),
  });
  const resolveUser = await newUser.save();
  const fetchCreated = { id: resolveUser._id, name, email };
  return fetchCreated;
};

userService.findByEmail = async (email) => User.findOne({ email });
userService.findById = async (id) => User.findById(id);

export default userService;
