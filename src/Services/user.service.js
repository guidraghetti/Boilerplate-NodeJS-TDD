import { hashSync } from "bcrypt";
import User from "../Models/user.model.js";

const userService = {};

userService.save = async (name, email, password) => {
  const newUser = new User({
    name,
    email,
    password: hashSync(password, 10),
  });
  const resolveUser = await newUser.save();
  const fetchCreated = { _id: resolveUser._id, name, email };
  return fetchCreated;
};
userService.updateUser = async (userId, book) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { books: book } },
    { new: true }
  );
  return user;
};

userService.findByEmail = async (email) => User.findOne({ email });
userService.findById = async (id) => User.findById(id, " _id name email");
userService.findAllUsers = async () => User.find({}, "_id name email books");
userService.findBooks = async (id, typeBook) => {
  const { name, email, books } = await User.findOne({ _id: id }).populate({
    path: "books",
    match: { type: { $eq: typeBook } },
  });
  const userBooks = {
    userId: id,
    name,
    email,
    books,
  };
  return userBooks;
};

export default userService;
