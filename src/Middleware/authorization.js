import jwt from "jsonwebtoken";
import CONFIG from "../Config/index.js";
import userService from "../Services/user.service.js";

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === "") {
    res.status(400).send();
    return next();
  }
  jwt.verify(authorization, CONFIG.jwt.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send();
    }
    const loggedUser = await userService.findById(decoded.id);
    if (!loggedUser) {
      return res.status(401).send();
    }
    req.user = loggedUser;
    return next();
  });
  return true;
};

export default auth;
