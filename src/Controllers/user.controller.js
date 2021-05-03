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
    const haveUser = await userService.findUser(user.email);
    if (haveUser.status)
      return { status: false, error: "E-mail já está cadastrado!" };
    else return await userService.save(user);
  } else {
    return { status: false, error: "Você deve preencher todos os campos!" };
  }
};

export default userController;
