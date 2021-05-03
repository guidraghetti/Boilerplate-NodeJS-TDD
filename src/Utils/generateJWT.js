import jwt from "jsonwebtoken";
import CONFIG from "../Config/index.js";

const { secret } = CONFIG.jwt;

const generateJWT = (params = {}) => jwt.sign(params, secret);

export default generateJWT;
