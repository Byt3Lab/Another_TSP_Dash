import { AdminLoginModel } from "../models/adminLogin.model.js";
import chalk from "chalk";
import bcrypt from "bcryptjs";
import { tokenGen } from "../middlewares/tokenGen.service.js";
import moment from "moment";

const authLogin = async (req, res) => {
  const { mail, pwd, phone } = req.body;
  if (!(mail || phone) || !pwd) {
    res.status(400).json({
      error: "You may want to provide your credentials first.",
    });
    console.log(
      chalk.yellow(
        "[i] POST -> [/auth] -> FAILED -> Request With Missing Credentials."
      )
    );
  } else if ((mail || phone) && pwd) {
    if (req.body.mail) {
      // console.log("Here: ", req.cookies);
      AdminLoginModel.findOne({ mail }, async (err, admin) => {
        if (!admin) {
          res.status(404).json({
            error: "That user is likely not existing.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/auth] -> FAILED -> Undefined Administrator With Mail ",
              mail,
              bcrypt.hashSync("password", 10)
            )
          );
        } else if (err) {
          res.status(500).json({
            error: "An error occurred; Please, retry later.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/auth] -> FAILED -> An Error Occurred -> ",
              err.message
            )
          );
        } else if (admin) {
          if (await bcrypt.compare(pwd, admin.pwd)) {
            const token = tokenGen(admin, "administrator");
            const status = bcrypt.hashSync("authenticated", 10);
            let now = moment();
            now.month(now.month() + 1);
            //To Use Outside Localhost
            //res.cookie('authToken',token, {httpOnly: true,  expires: now.toDate(), path: '/', secure: false, sameSite: 'Strict' })
            res.cookie("authToken", token, {
              httpOnly: true,
              expires: now.toDate(),
              path: "/",
              secure: true,
              sameSite: "None",
            });
            res.cookie("uid", admin.id, {
              httpOnly: true,
              expires: now.toDate(),
              path: "/",
              secure: true,
              sameSite: "None",
            });
            // res.setHeader('Set-Cookie', ['authToken='+token+'; Path=/; Secure; SameSite=Strict; HttpOnly; Expires='+now.utc()])
            res.status(200).json({
              info: "Administrator Successfully Authenticated.",
              mail: admin.mail,
              auth: status,
            });
            console.log(
              chalk.cyan(
                "[i] POST -> [/auth] -> Administrator Authenticated -> ",
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
                "[i] POST -> [/auth] -> FAILED -> Provided Invalid Credentials."
              )
            );
          }
        }
      });
    } else if (req.body.phone) {
      AdminLoginModel.findOne({ phone }, async (err, admin) => {
        if (!admin) {
          res.status(404).json({
            error: "That user is likely not existing.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/auth] -> FAILED -> Undefined Administrator With Phone ",
              phone
            )
          );
        } else if (err) {
          res.status(500).json({
            error: "An error occurred; Please, retry later.",
          });
          console.log(
            chalk.yellow(
              "[i] POST -> [/auth] -> FAILED -> An Error Occurred -> ",
              err.message
            )
          );
        } else if (admin) {
          if (await bcrypt.compare(pwd, admin.pwd)) {
            const token = tokenGen(admin, "administrator");
            const status = bcrypt.hashSync("authenticated", 10);
            let now = moment();
            now.month(now.month() + 1);
            //To Use Outside Localhost
            //res.cookie('authToken',token, {httpOnly: true,  expires: now.toDate(), path: '/', secure: false, sameSite: 'Strict' })
            res.cookie("authToken", token, {
              httpOnly: true,
              expires: now.toDate(),
              path: "/",
              secure: true,
              sameSite: "None",
            });
            res.cookie("uid", admin.id, {
              httpOnly: true,
              expires: now.toDate(),
              path: "/",
              secure: true,
              sameSite: "None",
            });
            res.status(200).json({
              info: "Administrator Successfully Authenticated.",
              mail: admin.mail,
              auth: status,
            });
            console.log(
              chalk.cyan(
                "[i] POST -> [/auth] -> Administrator Authenticated -> ",
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
                "[i] POST -> [/auth] -> FAILED -> Provided Invalid Credentials."
              )
            );
          }
        }
      });
    }
  }
};

export { authLogin };