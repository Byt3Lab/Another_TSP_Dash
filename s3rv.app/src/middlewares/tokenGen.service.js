import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.API_SECRET;

const tokenGen = (user, role) => {
  const payload = {
    id: user.adminID ? user.adminID : user.employID,
    entity: role,
    mail: user.mail,
  };
  const options = {
    expiresIn: "30d",
  };
  return jwt.sign(payload, API_KEY, options);
};

export { tokenGen };
