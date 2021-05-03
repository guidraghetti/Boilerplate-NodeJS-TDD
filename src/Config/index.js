import { config } from "dotenv";
config();

const { PORT, JWT_SECRET, JWT_EXPIRATION } = process.env;

export default {
  port: PORT,
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRATION,
  },
};
