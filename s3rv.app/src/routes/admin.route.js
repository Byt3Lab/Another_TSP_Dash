/*   verifyToken = require("../middleware/check_admin_jwt"); */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";
import stringify from "json-stringify-safe";
import express from "express";
const adminRouter = express.Router();
import {
  all_admins,
  add_admin,
  fetch_admin,
  del_admin,
  update_admin,
} from "../controllers/admin.controller.js";
import { tokenCheck } from "../middlewares/tokenCheck.service.js";

// Fetch ALL Admins
adminRouter.get("/0", tokenCheck, all_admins, (req, res) => {});

// Admin Add
adminRouter.post("/add", tokenCheck, add_admin, (req, res) => {});

// Fetch Admin
adminRouter.get("/:id", tokenCheck, fetch_admin, (req, res) => {});

// Delete Admin
adminRouter.delete("/:id", tokenCheck, del_admin, (req, res) => {});

// Update Admin
adminRouter.put("/update/:id", tokenCheck, update_admin, (req, res) => {});

export { adminRouter };
