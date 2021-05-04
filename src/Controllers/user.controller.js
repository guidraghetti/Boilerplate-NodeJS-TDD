import userService from "../Services/user.service.js";

const userController = {};

userController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findById(id);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An internal error ocurred!" });
  }
};

userController.getAll = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An internal error ocurred!" });
  }
};

export default userController;
