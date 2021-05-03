import User from "../Models/user.model.js";

const userService = {};

userService.save = async (user) => {
  try {
    const newUser = new User(user);
    const { _id, name, email } = await newUser.save();
    const fetchCreated = {
      id: _id,
      name,
      email,
    };
    return { status: true, data: fetchCreated };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};

export default userService;
