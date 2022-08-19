import { useParams } from "react-router-dom";
import { MouseEventHandler, useEffect, useState } from "react";
import io from "socket.io-client";
import log from "loglevel";
import useApi from "../hooks/useApi";

interface ChatMessage {
  roomOwner: String;
  commenter: String;
  timestamp: String;
  content: String;
}

const socket = io("http://localhost:3002");

function Chat({ user }: { user: string }) {
  // const [connected, setConnected] = useState(socket.connected);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const { userName } = useParams();
  const { request } = useApi();

  const messageHandler: MouseEventHandler<HTMLButtonElement> = () => {
    socket.emit("message", userName, user, currentMessage);
  };
  useEffect(() => {
    const abortController: AbortController = new AbortController();

    (async () => {
      try {
        const req = await request();
        const { data } = await req.get(`/users/${userName}/chat`);
        setMessageList(data.chatPage);
      } catch (e) {
        log.error(e);
      }
    })();

    return () => abortController?.abort();
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      // setConnected(true);
    });
    socket.on("disconnect", () => {
      // setConnected(false);
    });

    socket.emit("join", userName, user);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  socket.on("message", (chat: ChatMessage) => {
    setMessageList(messageList.concat(chat));
  });

  return (
    <>
      <input
        type="text"
        onChange={(e) => setCurrentMessage(e.currentTarget.value)}
      />
      <button type="button" onClick={messageHandler}>
        submit
      </button>
      {messageList.map((chat) => (
        <div key={chat.timestamp + userName!}>
          <p>{chat.commenter}</p>
          <p>{chat.timestamp}</p>
          <p>{chat.content}</p>
        </div>
      ))}
    </>
  );
}

export default Chat;
// TODO: Establish a Socket.IO connection
// LAZY LOAD THE SOCKET IO
// Client(s) -> Server