import { createServer } from "http";
import { Server } from "socket.io";
import log from "loglevel";
import ChatMessage from "../models/chat-message.model";
import User from "../models/user.model";

const initializeChat = (port: number | 8081) => {
  const host = process.env.HOST;
  const httpServer = createServer();
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.sockets.on("connection", (socket) => {
    socket.on("join", (room, user) => {
      log.info(`${user} has joined chatroom ${room}`);
      socket.join(room);
    });
    socket.on("message", (room, name, message) => {
      const curTime = new Date();
      log.info(`${name}: ${message} in chatroom ${room}`);

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

  httpServer.listen(port, host, () => {
    log.info(`Chat log running at ${port}`);
  });
};

export default initializeChat;