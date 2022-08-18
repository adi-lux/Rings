import dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import log from "loglevel";
import dbConnect from "./setup/db";
import homeRouter from "./routes/homepage";
import userRouter from "./routes/user";
import ringsRouter from "./routes/ring";
import ChatMessage from "./models/chat-message";
import User from "./models/user";

dotenv.config();

const port = process.env.PORT || 8080;
const mongo = process.env.MONGO_URI;

dbConnect(mongo).catch(() => log.error("Could not connect to the database."));
const app = express();
app.use(cors());
app.use(auth());
app.use(express.json());
log.enableAll();
const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

io.sockets.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });
  socket.on("message", (room, name, message) => {
    const curTime = new Date();
    io.sockets.in(room).emit("message", {
      roomOwner: room,
      commenter: name,
      timestamp: curTime,
      content: message,
    });
    // push to user's chat page
    new ChatMessage({
      roomOwner: room,
      commenter: name,
      timestamp: new Date(),
      content: message,
    })
      .save()
      .then((newMessage) =>
        User.findByIdAndUpdate(room, {
          $push: { chatPage: newMessage },
        }).exec()
      );
  });
});

httpServer.listen(3002);

app.use("/users", userRouter);
app.use("/rings", ringsRouter);
app.use("/", homeRouter);

// start the Express server
app.listen(port, () => {
  log.info(`server started at http://127.0.0.1:${port}`);
});