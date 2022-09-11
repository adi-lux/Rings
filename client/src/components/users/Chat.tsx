import { useParams } from "react-router-dom";
import { MouseEventHandler, useEffect, useState } from "react";
import io from "socket.io-client";
import log from "loglevel";
import useApi from "../../hooks/useApi";

interface ChatMessage {
  roomOwner: string;
  commenter: string;
  timestamp: string;
  content: string;
}

const socket = io(`${import.meta.env.VITE_AUDIENCE}:3002`);

function Chat({ user }: { user: string }) {
  // const [connected, setConnected] = useState(socket.connected);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const { userName } = useParams();
  const { request } = useApi();

  const messageHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (currentMessage) {
      socket.emit("message", userName, user, currentMessage);
      setCurrentMessage("");
    }
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
    <div className="grid p-10 gap-2">
      <h1 className="font-bold text-2xl">Chat with {user}</h1>
      {messageList.map((chat) => (
        <div
          key={chat.timestamp + userName!}
          className="grid grid-cols-2 w-full h-20 flex justify-between px-5 flex-row bg-blue-200 items-center rounded-xl pl-5  border-2 border-white"
        >
          <b>{chat.commenter}</b>
          <i className="justify-self-end">
            {new Date(chat.timestamp).toLocaleString()}
          </i>
          <p>{chat.content}</p>
        </div>
      ))}

      <div className="flex flex-row">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.currentTarget.value)}
          className="border-2 rounded-lg w-full"
        />
        <button type="button" className="classic-btn" onClick={messageHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Chat;
// TODO: Establish a Socket.IO connection
// LAZY LOAD THE SOCKET IO
// Client(s) -> Server