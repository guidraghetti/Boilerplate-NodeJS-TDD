import userService from "../Services/user.service.js";
import validator from "validator";
import bcrypt from "bcrypt";
import generateJWT from "../Utils/generateJWT.js";

const userController = {};

userController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email) || !password) {
      return res.status(400).json({ error: "E-mail/senha inválidos!" });
    }
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "E-mail inválido!" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Senha inválida!" });
    }
    const jwt = generateJWT({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({});
  }
};

userController.create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !validator.isEmail(email) || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem estar preenchidos!" });
    }
    const user = await userService.findByEmail(email);
    if (user) {
      return res.status(400).json({
        error: "E-mail já cadastrado!",
      });
    }
    const newUser = await userService.save(name, email, password);
    const jwt = generateJWT({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
    return res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        token: jwt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

export default userController;
