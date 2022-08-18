import dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import log from "loglevel";
import dbConnect from "./setup/db";
import homeRouter from "./routes/homepage.route";
import userRouter from "./routes/user.route";
import ringsRouter from "./routes/ring.route";
import initializeChat from "./setup/socket";

dotenv.config();

const port = process.env.PORT || 8080;
const chatPort = process.env.CHAT_PORT || 8081;
const mongo = process.env.MONGO_URI;

dbConnect(mongo).catch(() => log.error("Could not connect to the database."));

const app = express();

app.use(cors());
app.use(auth());
app.use(express.json());

initializeChat(chatPort);

app.use("/users", userRouter);
app.use("/rings", ringsRouter);
app.use("/", homeRouter);

app.listen(port, () => {
  log.info(`server started at http://127.0.0.1:${port}`);
});