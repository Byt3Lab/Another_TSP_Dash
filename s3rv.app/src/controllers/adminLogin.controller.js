import { AdminModel } from "../models/admin.model.js";
import { AdminLoginModel } from "../models/adminLogin.model.js";
import chalk from "chalk";
import stringify from "json-stringify-safe";
import bcrypt from "bcrypt";
import { tokenGen } from "../middlewares/tokenGen.service.js";

const auth_admin = async (req, res) => {
  const { mail, pwd, phone } = req.body;
  if (!(mail || phone) || !pwd) {
    res.status(400).json({
      error: "You may want to provide your credentials first.",
    });
    console.log(
      chalk.yellow(
        "[i] POST -> [/admin/auth] -> FAILED -> Request With Missing Credentials."
      )
    );
  } else if ((mail || phone) && pwd) {
    if (req.body.mail) {
      AdminLoginModel.findOne({ mail }, async (err, admin) => {
        if (!admin) {
          res.status(404).json({
            error: "Administrator is likely not existing.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/admin/auth] -> FAILED -> Undefined Administrator With Mail ",
              mail
            )
          );
        } else if (err) {
          res.status(500).json({
            error: "An error occurred; Please, retry later.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/admin/auth] -> FAILED -> An Error Occurred -> ",
              err.message
            )
          );
        } else if (admin) {
          if (await bcrypt.compare(pwd, admin.pwd)) {
            const token = tokenGen(admin);
            res.status(200).json({
              info: "Administrator Successfully Authenticated.",
              mail: admin.mail,
              token: token,
            });
            console.log(
              chalk.cyan(
                "[i] POST -> [/admin/auth] -> Administrator Authenticated -> ",
                admin.mail
              )
            );
          } else {
            res.status(401).json({
              error:
                "Seems Wrong. Please, check your credentials and try again.",
            });
            console.log(
              chalk.yellow(
                "[i] POST -> [/admin/auth] -> FAILED -> Provided Invalid Credentials."
              )
            );
          }
        }
      });
    } else if (req.body.phone) {
      AdminLoginModel.findOne({ phone }, async (err, admin) => {
        if (!admin) {
          res.status(404).json({
            error: "Administrator is likely not existing.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/admin/auth] -> FAILED -> Undefined Administrator With Phone -> ",
              phone
            )
          );
        } else if (err) {
          res.status(500).json({
            error: "An error occurred; Please, retry later.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/admin/auth] -> FAILED -> An Error Occurred -> ",
              err.message
            )
          );
        } else if (admin) {
          if (await bcrypt.compare(pwd, admin.pwd)) {
            const token = tokenGen(admin);
            res.status(200).json({
              info: "Administrator Successfully Authenticated.",
              mail: admin.mail,
              token: token,
            });
            console.log(
              chalk.cyan(
                "[i] POST -> [/admin/auth] -> Administrator Authenticated -> ",
                admin.mail
              )
            );
          } else {
            res.status(401).json({
              error:
                "Seems Wrong. Please, check your credentials and try again.",
            });
            console.log(
              chalk.yellow(
                "[i] POST -> [/admin/auth] -> FAILED -> Provided Invalid Credentials."
              )
            );
          }
        }
      });
    }
  }
};

export { auth_admin };
