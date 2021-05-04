import jwt from "jsonwebtoken";
import CONFIG from "../Config/index.js";
import userService from "../Services/user.service.js";

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === "") {
    return res.status(401).json({ error: "Unauthorized!" });
  }
  jwt.verify(
    authorization.split(" ")[1],
    CONFIG.jwt.secret,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      const loggedUser = await userService.findById(decoded.id);
      if (!loggedUser) {
        return res.status(401).json({ error: "Unauthorized!" });
      }
      req.user = loggedUser;
      return next();
    }
  );
  return true;
};

export default auth;
