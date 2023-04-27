/*   verifyToken = require("../middleware/check_admin_jwt"); */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";
import stringify from "json-stringify-safe";
import express from "express";
const adminLoginRouter = express.Router();
import { auth_admin } from "../controllers/adminLogin.controller.js";

// Admin Auth
adminLoginRouter.post("/auth", auth_admin, async (req, res) => {});

export { adminLoginRouter };
