/*   verifyToken = require("../middleware/check_admin_jwt"); */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";
import stringify from "json-stringify-safe";
import express from "express";
const employRouter = express.Router();
import {
  all_employs,
  add_employ,
  fetch_employ,
  del_employ,
  update_employ,
  get_dashboard_data,
} from "../controllers/employ.controller.js";
import { tokenCheck } from "../middlewares/tokenCheck.service.js";

// Fetch ALL Admins
employRouter.get("/0", tokenCheck, all_employs, (req, res) => {});

// Admin Add
employRouter.post("/add", tokenCheck, add_employ, (req, res) => {});

// Fetch Admin
employRouter.get("/:id", tokenCheck, fetch_employ, (req, res) => {});

// Delete Admin
employRouter.delete("/:id", tokenCheck, del_employ, (req, res) => {});

// Update Admin
employRouter.put("/update/:id", tokenCheck, update_employ, (req, res) => {});

employRouter.get(
  "/data/dashboard/",
  tokenCheck,
  get_dashboard_data,
  (req, res) => {}
);

export { employRouter };
