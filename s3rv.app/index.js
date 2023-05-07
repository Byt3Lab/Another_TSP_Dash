"use strict";

import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import chalker from "chalkercli";
dotenv.config();
import {
  connect,
  connector_get,
  disconnect,
} from "./src/configs/db_connect.js";
import { adminRouter } from "./src/routes/admin.route.js";
import { authLoginRouter } from "./src/routes/authLogin.route.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 7000;

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ type: ["application/json", "text/plain"] }));

chalker.neon("\n[+] Starting M3NZ3N API Server...", 3);

setTimeout(async () => {
  await connect();
  app.use("/admin", adminRouter);
  app.use("/", authLoginRouter);
  app.get("/", (req, res) => {
    res.send(
      JSON.stringify({
        info: "This is a response from the API Server. Cool huh ?",
      })
    );
  });

  server.listen(port, () => {
    console.log(
      chalk.green("[+] Server is listening on port -> "),
      chalk.yellow(port)
    );
    console.log(chalk.green("[+] Server Successfully Started\n"));
  });
}, 3000);
