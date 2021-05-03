import userService from "../Services/user.service.js";
import validator from "validator";

const userController = {};

userController.create = async (user) => {
  if (
    user.name !== " " ||
    user.email !== " " ||
    validator.isEmail(user.email) ||
    user.password !== " "
  ) {
    return await userService.save(user);
  } else {
    return { status: false, error: "Você deve preencher todos os campos!" };
  }
};

export default userController;
