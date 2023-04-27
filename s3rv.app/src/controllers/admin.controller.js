import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminModel } from "../models/admin.model.js";
import { AdminLoginModel } from "../models/adminLogin.model.js";
import chalk from "chalk";
import stringify from "json-stringify-safe";

const all_admins = (req, res) => {
  AdminModel.find()
    .then((admin) => {
      res.status(200).json(admin),
        console.log(chalk.cyan("[i] GET -> [/admin/0] -> *Administrators"));
    })
    .catch((err) => {
      res.status(400).json({ error: "failed to fetch administrators." }),
        console.log(
          chalk.yellow("[i] GET -> [/admin/0] -> FAILED -> ", err.message)
        );
    });
};

const add_admin = (req, res) => {
  const name = req.body.name;
  const forename = req.body.forename;
  const age = req.body.age;
  const genre = req.body.genre;
  const work_at = req.body.work_at;
  const mail = req.body.mail.toLowerCase();
  const phone = req.body.phone;
  const pwd = bcrypt.hashSync(req.body.pwd, 10);

  const newAdmin = new AdminModel({
    name,
    forename,
    age,
    genre,
    work_at,
  });

  newAdmin
    .save()
    .then((admin) => {
      const newAdminLogin = new AdminLoginModel({
        adminID: admin.id,
        mail,
        phone,
        pwd,
      });
      newAdminLogin
        .save()
        .then(() => {
          res.status(200).json({ info: "Administrator Added." }),
            console.log(
              chalk.cyan(
                "[i] POST -> [/admin/add] -> Added an Administrator -> ",
                admin.forename,
                "",
                admin.name
              )
            );
        })
        .catch((err) => {
          res.status(400).json({ error: "Failed to add the administrator." }),
            console.log(
              chalk.yellow(
                "[i] POST -> [/admin/add] -> FAILED -> ",
                err.message
              )
            );
        });
    })
    .catch((err) => {
      res.status(400).json({ error: "Failed to add the administrator." }),
        console.log(
          chalk.yellow("[i] POST -> [/admin/add] -> FAILED -> ", err.message)
        );
    });
};

const fetch_admin = (req, res) => {
  AdminModel.findById(req.params.id)
    .then((admin) => {
      res.json(admin),
        console.log(
          chalk.cyan(
            "[i] GET -> [/admin/" + req.params.id + "] -> Fetched ",
            admin.forename,
            admin.name,
            " Data"
          )
        );
    })
    .catch((err) => {
      res.status(400).json({ info: "Failed to fetch the administrator data." }),
        console.log(
          chalk.yellow(
            "[i] GET -> [/admin/" + req.params.id + "] -> FAILED -> ",
            err.message
          )
        );
    });
};

const del_admin = (req, res) => {
  try {
    AdminModel.findByIdAndDelete(req.params.id).then(() => {
      try {
        AdminLoginModel.find({ adminID: req.params.id }).then((adminLog) => {
          if (adminLog.length > 0) {
            adminLog.forEach((adminLog) => {
              adminLog.remove();
            }),
              res.status(200).json({ info: "Admin Deleted." }),
              console.log(
                chalk.cyan(
                  "[i] DELETE -> [/admin/" + req.params.id + "] -> Deleted ",
                  adminLog.forename,
                  adminLog.name,
                  " Data."
                )
              );
          } else {
            res.status(404).json({ info: "Admin Not Found." }),
              console.log(
                chalk.yellow(
                  "[i] DELETE -> [/admin/" + req.params.id + "] -> Not Found "
                )
              );
          }
        });
      } catch {
        (err) => {
          res.status(400).json({ info: "Failed to delete the administrator." }),
            console.log(
              chalk.yellow(
                "[i] DELETE -> [/admin/" + req.params.id + "] -> FAILED -> ",
                err.message
              )
            );
        };
      }
    });
  } catch {
    (err) => {
      res.status(400).json({ info: "Failed to delete the administrator." }),
        console.log(
          chalk.yellow(
            "[i] DELETE -> [/admin/" + req.params.id + "] -> FAILED -> ",
            err.message
          )
        );
    };
  }
};

const update_admin = (req, res) => {
  var response = {
    status: 200,
    message: [],
  };
  if (Object.keys(req.body).length > 0) {
    if (req.body.pwd) {
      AdminModel.findById(req.params.id)
        .then((admin) => {
          const pwd = bcrypt.hashSync(req.body.pwd, 10);
          AdminLoginModel.findOneAndUpdate({ adminID: req.params.id }, { pwd })
            .then(() => {
              response.status = 200;
              response.message.push({
                info: "Administrator Password Updated.",
              });
              console.log(
                chalk.cyan(
                  "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
                  admin.forename,
                  admin.name,
                  "'s Password."
                )
              );
            })
            .catch((err) => {
              response.status = 400;
              response.message.push({
                info: "Failed to update the administrator password.",
              });
              console.log(
                chalk.yellow(
                  "[i] PUT -> [/admin/" +
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
            info: "Failed to update the administrator password.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Password -> ",
              err.message
            )
          );
        });
    }
    if (req.body.mail) {
      AdminModel.findById(req.params.id)
        .then((admin) => {
          const mail = req.body.mail;
          AdminLoginModel.findOneAndUpdate({ adminID: req.params.id }, { mail })
            .then(() => {
              response.status = 200;
              response.message.push({ info: "Administrator Mail Updated." });
              console.log(
                chalk.cyan(
                  "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
                  admin.forename,
                  admin.name,
                  "'s Mail."
                )
              );
            })
            .catch((err) => {
              response.status = 400;
              response.message.push({
                info: "Failed to update the administrator mail.",
              });
              console.log(
                chalk.yellow(
                  "[i] PUT -> [/admin/" +
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
            info: "Failed to update the administrator mail.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Mail -> ",
              err.message
            )
          );
        });
    }
    if (req.body.phone) {
      AdminModel.findById(req.params.id)
        .then((admin) => {
          const phone = req.body.phone;
          AdminLoginModel.findOneAndUpdate(
            { adminID: req.params.id },
            { phone }
          )
            .then(() => {
              response.status = 200;
              response.message.push({ info: "Administrator Phone Updated." });
              console.log(
                chalk.cyan(
                  "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
                  admin.forename,
                  admin.name,
                  "'s Phone Number."
                )
              );
            })
            .catch((err) => {
              response.status = 400;
              response.message.push({
                info: "Failed to update the administrator phone number.",
              });
              console.log(
                chalk.yellow(
                  "[i] PUT -> [/admin/" +
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
            info: "Failed to update the administrator phone number.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Phone Number -> ",
              err.message
            )
          );
        });
    }
    if (req.body.forename) {
      const forename = req.body.forename;
      AdminModel.findByIdAndUpdate(req.params.id, { forename })
        .then((admin) => {
          response.status = 200;
          response.message.push({ info: "Administrator Forename Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
              admin.forename,
              admin.name,
              "'s Forename."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the administrator forename.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Forename -> ",
              err.message
            )
          );
        });
    }
    if (req.body.name) {
      const name = req.body.name;
      AdminModel.findByIdAndUpdate(req.params.id, { name })
        .then((admin) => {
          response.status = 200;
          response.message.push({ info: "Administrator Name Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
              admin.forename,
              admin.name,
              "'s Name."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the administrator name.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Name -> ",
              err.message
            )
          );
        });
    }
    if (req.body.age) {
      const age = req.body.age;
      AdminModel.findByIdAndUpdate(req.params.id, { age })
        .then((admin) => {
          response.status = 200;
          response.message.push({ info: "Administrator Age Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
              admin.forename,
              admin.name,
              "'s Age."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the administrator age.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Age -> ",
              err.message
            )
          );
        });
    }
    if (req.body.work_at) {
      const work_at = req.body.work_at;
      AdminModel.findByIdAndUpdate(req.params.id, { work_at })
        .then((admin) => {
          response.status = 200;
          response.message.push({ info: "Administrator Workplace Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
              admin.forename,
              admin.name,
              "'s Workplace."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the administrator workplace.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
                req.params.id +
                "] -> FAILED To Update Workplace -> ",
              err.message
            )
          );
        });
    }
    if (req.body.genre) {
      const genre = req.body.genre;
      AdminModel.findByIdAndUpdate(req.params.id, { genre })
        .then((admin) => {
          response.status = 200;
          response.message.push({ info: "Administrator Genre Updated." });
          console.log(
            chalk.cyan(
              "[i] PUT -> [/admin/" + req.params.id + "] -> Updated ",
              admin.forename,
              admin.name,
              " Genre."
            )
          );
        })
        .catch((err) => {
          response.status = 400;
          response.message.push({
            info: "Failed to update the administrator genre.",
          });
          console.log(
            chalk.yellow(
              "[i] PUT -> [/admin/" +
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
        "[i] PUT -> [/admin/" +
          req.params.id +
          "] -> CANCELED -> Request Seemed Empty."
      )
    );
  }
  setTimeout(() => {
    res.status(response.status).json(response.message);
  }, 1000);
};

export { all_admins, add_admin, fetch_admin, del_admin, update_admin };
