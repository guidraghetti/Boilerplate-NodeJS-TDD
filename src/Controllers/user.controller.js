import userService from "../Services/user.service.js";

const userController = {};

userController.create = async (user) => {
  return await userService.save(user);
};

export default userController;
