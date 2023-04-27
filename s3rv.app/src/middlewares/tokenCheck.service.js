import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.API_SECRET;

const tokenCheck = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization || req.cookies.authToken;
  if (!token) {
    res.status(403).send({
      error: "You may want to authenticate first.",
    });
    console.log(chalk.yellow("Token Check FAILED -> No Token Provided."));
  } else if (token) {
    try {
      const decoded = jwt.verify(token, API_KEY);
      if (!decoded) {
        res.status(401).send({
          error: "Your Authorization seems invalid. Expired maybe ?.",
        });
        console.log(
          chalk.yellow("Token Check FAILED -> Invalid Token Provided.")
        );
      } else if (decoded) {
        return next();
      }
    } catch (err) {
      res.status(401).send({
        error: "Your Authorization seems invalid. Expired maybe ?.",
      });
      console.log(
        chalk.yellow(
          "Token Check FAILED -> Invalid Token Provided -> ",
          err.message
        )
      );
    }
  }
};

export { tokenCheck };
