/*   verifyToken = require("../middleware/check_admin_jwt"); */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";
import stringify from "json-stringify-safe";
import express from "express";
const authLoginRouter = express.Router();
import { authLogin } from "../controllers/authLogin.controller.js";

// Admin Auth
authLoginRouter.post("/auth", authLogin, async (req, res) => {});

export { authLoginRouter };
