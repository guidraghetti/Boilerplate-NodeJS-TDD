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
    throw error;
  }
};

userService.findUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      return { status: true, user };
    } else {
      return { status: false, error: "Usuário não encontrado!" };
    }
  } catch (error) {
    throw error;
  }
};

export default userService;
