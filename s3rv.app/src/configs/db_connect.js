import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
//const { MongoClient } = require("mongodb");
const url = process.env.LOCALHOST_MONGO_STR;
//const clt = new MongoClient(url);
import chalk from "chalk";

async function connect() {
  try {
    if (
      await mongoose.connect(url, {
        useNewUrlParser: true,
      })
    ) {
      console.log(chalk.green("[+] Connected To The Database"));
      console.log(chalk.green("[+] Database Connection Seems Fine. Test OK."));
    }
    // setTimeout(() => {
    //   console.log("[+] Closing...");
    //   clt.close();
    // }, 3000);
  } catch (err) {
    console.log(
      chalk.red("\n[!] An Error Occurred While Connecting To The Database -> "),
      chalk.yellow(err.message)
    );
    console.log(chalk.red("[!] Server Was Unable To Connect To The Database."));
    console.log(chalk.red("[!] Queries May Not Work."));
  }
}

function connector_get() {
  return new mongoose.connection();
}

async function disconnect() {
  try {
    if (await mongoose.connection.close()) {
      console.log(chalk.blue("[x] Disconnected From The Database"));
    }
  } catch (err) {
    console.log(
      chalk.red("[!] An Error Occurred While Disconnecting From Database -> "),
      chalk.yellow(err.message)
    );
  }
}

export { connector_get, connect, disconnect };
