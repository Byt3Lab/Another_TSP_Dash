import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { EmployModel } from "../models/employ.model.js";
import { EmployLoginModel } from "../models/employLogin.model.js";
import chalk from "chalk";
import stringify from "json-stringify-safe";

const all_employs = (req, res) => {
  EmployModel.find()
    .then((employ) => {
      res.status(200).json(employ),
        console.log(chalk.cyan("[i] GET -> [/employ/0] -> *Employees"));
    })
    .catch((err) => {
      res.status(400).json({ error: "failed to fetch employees." }),
        console.log(
          chalk.yellow("[i] GET -> [/employ/0] -> FAILED -> ", err.message)
        );
    });
};

const add_employ = (req, res) => {
  const name = req.body.name;
  const forename = req.body.forename;
  const age = req.body.age;
  const genre = req.body.genre;
  const work_at = req.body.work_at;
  const roleLabel = req.body.roleLabel;
  const mail = req.body.mail.toLowerCase();
  const phone = req.body.phone;
  const pwd = bcrypt.hashSync(req.body.pwd, 10);

  const newEmploy = new EmployModel({
    name,
    forename,
    age,
    genre,
    work_at,
    roleLabel,
  });

  newEmploy
    .save()
    .then((employ) => {
      const newEmployLogin = new EmployLoginModel({
        employID: employ.id,
        mail,
        phone,
        pwd,
      });
      newEmployLogin
        .save()
        .then(() => {
          res.status(200).json({ info: "Employee Added." }),
            console.log(
              chalk.cyan(
                "[i] POST -> [/employ/add] -> Added an Employee -> ",
                employ.forename,
                "",
                employ.name
              )
            );
        })
        .catch((err) => {
          res.status(400).json({ error: "Failed to add the employee." }),
            console.log(
              chalk.yellow(
                "[i] POST -> [/employ/add] -> FAILED -> ",
                err.message
              )
            );
        });
    })
    .catch((err) => {
      res.status(400).json({ error: "Failed to add the employee." }),
        console.log(
          chalk.yellow("[i] POST -> [/employ/add] -> FAILED -> ", err.message)
        );
    });
};

const fetch_employ = (req, res) => {
  EmployModel.findById(req.params.id)
    .then((employ) => {
      res.json(employ),
        console.log(
          chalk.cyan(
            "[i] GET -> [/employ/" + req.params.id + "] -> Fetched ",
            employ.forename,
            employ.name,
            " Data"
          )
        );
    })
    .catch((err) => {
      res.status(400).json({ info: "Failed to fetch the employee data." }),
        console.log(
          chalk.yellow(
            "[i] GET -> [/employ/" + req.params.id + "] -> FAILED -> ",
            err.message
          )
        );
    });
};

const del_employ = (req, res) => {
  try {
    EmployModel.findByIdAndDelete(req.params.id).then(() => {
      try {
        EmployLoginModel.find({ employID: req.params.id }).then((employLog) => {
          if (employLog.length > 0) {
            employLog.forEach((employLog) => {
              employLog.remove();
            }),
              res.status(200).json({ info: "Employee Deleted." }),
              console.log(
                chalk.cyan(
                  "[i] DELETE -> [/employ/" + req.params.id + "] -> Deleted ",
                  adminLog.forename,
                  adminLog.name,
                  " Data."
                )
              );
          } else {
            res.status(404).json({ info: "Employee Not Found." }),
              console.log(
                chalk.yellow(
                  "[i] DELETE -> [/employ/" + req.params.id + "] -> Not Found "
                )
              );
          }
        });
      } catch {
        (err) => {
          res.status(400).json({ info: "Failed to delete the employee." }),
            console.log(
              chalk.yellow(
                "[i] DELETE -> [/employ/" + req.params.id + "] -> FAILED -> ",
                err.message
              )
            );
        };
      }
    });
  } catch {
    (err) => {
      res.status(400).json({ info: "Failed to delete the employee." }),
        console.log(
          chalk.yellow(
            "[i] DELETE -> [/employ/" + req.params.id + "] -> FAILED -> ",
            err.message
          )
        );
    };
  }
};

const update_employ = (req, res) => {
  var response = {
    status: 200,
    message: [],
  };
  if (Object.keys(req.body).length > 0) {
    if (req.body.pwd) {
      EmployModel.findById(req.params.id)
        .then((employ) => {
          const pwd = bcrypt.hashSync(req.body.pwd, 10);
          EmployLoginModel.findOneAndUpdate(
            { employID: req.params.id },
            { pwd }
          )
            .then(() => {
              response.status = 200;
              response.message.push({
                info: "Employee Password Updated.",
              });
              console.log(
                chalk.cyan(
                  "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
                  employ.forename,
                  employ.name,
                  "'s Password."
                )
              );
            })
            .catch((err) => {
              response.status = 400;
              response.message.push({
                info: "Failed to update the employee password.",
              });
              console.log(
                chalk.yellow(
                  "[i] PUT -> [/employ/" +
                    req.params.id +
                    "] -> FAILED To Update Password -> ",
                  err.message
                )
              );
            });
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee password.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Password -> ",
              err.message
            )
          );
        });
    }
    if (req.body.mail) {
      EmployModel.findById(req.params.id)
        .then((employ) => {
          const mail = req.body.mail;
          EmployLoginModel.findOneAndUpdate(
            { employID: req.params.id },
            { mail }
          )
            .then(() => {
              response.status = 200;
              response.message.push({ info: "Employee Mail Updated." });
              console.log(
                chalk.cyan(
                  "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
                  employ.forename,
                  employ.name,
                  "'s Mail."
                )
              );
            })
            .catch((err) => {
              response.status = 400;
              response.message.push({
                info: "Failed to update the employee mail.",
              });
              console.log(
                chalk.yellow(
                  "[i] PUT -> [/employ/" +
                    req.params.id +
                    "] -> FAILED To Update Mail -> ",
                  err.message
                )
              );
            });
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee mail.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Mail -> ",
              err.message
            )
          );
        });
    }
    if (req.body.phone) {
      EmployModel.findById(req.params.id)
        .then((employ) => {
          const phone = req.body.phone;
          EmployLoginModel.findOneAndUpdate(
            { employID: req.params.id },
            { phone }
          )
            .then(() => {
              response.status = 200;
              response.message.push({ info: "Employee Phone Updated." });
              console.log(
                chalk.cyan(
                  "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
                  employ.forename,
                  employ.name,
                  "'s Phone Number."
                )
              );
            })
            .catch((err) => {
              response.status = 400;
              response.message.push({
                info: "Failed to update the employee phone number.",
              });
              console.log(
                chalk.yellow(
                  "[i] PUT -> [/employ/" +
                    req.params.id +
                    "] -> FAILED To Update Phone Number -> ",
                  err.message
                )
              );
            });
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee phone number.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Phone Number -> ",
              err.message
            )
          );
        });
    }
    if (req.body.forename) {
      const forename = req.body.forename;
      EmployModel.findByIdAndUpdate(req.params.id, { forename })
        .then((employ) => {
          response.status = 200;
          response.message.push({ info: "Employee Forename Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
              employ.forename,
              employ.name,
              "'s Forename."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee forename.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Forename -> ",
              err.message
            )
          );
        });
    }
    if (req.body.name) {
      const name = req.body.name;
      EmployModel.findByIdAndUpdate(req.params.id, { name })
        .then((employ) => {
          response.status = 200;
          response.message.push({ info: "Employee Name Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
              employ.forename,
              employ.name,
              "'s Name."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee name.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Name -> ",
              err.message
            )
          );
        });
    }
    if (req.body.age) {
      const age = req.body.age;
      EmployModel.findByIdAndUpdate(req.params.id, { age })
        .then((employ) => {
          response.status = 200;
          response.message.push({ info: "Employee Age Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
              employ.forename,
              employ.name,
              "'s Age."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee age.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Age -> ",
              err.message
            )
          );
        });
    }
    if (req.body.work_at) {
      const work_at = req.body.work_at;
      EmployModel.findByIdAndUpdate(req.params.id, { work_at })
        .then((employ) => {
          response.status = 200;
          response.message.push({ info: "Employee Workplace Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
              employ.forename,
              employ.name,
              "'s Workplace."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee workplace.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Workplace -> ",
              err.message
            )
          );
        });
    }
    if (req.body.genre) {
      const genre = req.body.genre;
      EmployModel.findByIdAndUpdate(req.params.id, { genre })
        .then((employ) => {
          response.status = 200;
          response.message.push({ info: "Employee Genre Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/employ/" + req.params.id + "] -> Updated ",
              employ.forename,
              employ.name,
              " Genre."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the employee genre.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/employ/" +
                req.params.id +
                "] -> FAILED To Update Genre -> ",
              err.message
            )
          );
        });
    }
  } else {
    response.status = 400;
    response.message.push({
      info: "Looks Like The Request Was Invalid or Empty.",
    });
    console.log(
      chalk.white(
        "[i] PUT -> [/employ/" +
          req.params.id +
          "] -> CANCELED -> Request Seemed Empty."
      )
    );
  }
  setTimeout(() => {
    res.status(response.status).json(response.message);
  }, 1000);
};

const get_dashboard_data = (req, res) => {
  if (req.cookies.uid) {
    res.json({ worked: true });
  } else {
    res.status(302).json({ worked: false });
  }
};

export {
  all_employs,
  add_employ,
  fetch_employ,
  del_employ,
  update_employ,
  get_dashboard_data,
};
