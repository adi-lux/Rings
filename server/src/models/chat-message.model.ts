import { model, Schema } from "mongoose";

const ChatMessageSchema = new Schema({
  roomOwner: String,
  commenter: String,
  timestamp: Date,
  content: String,
});

const ChatMessage = model("ChatMessage", ChatMessageSchema);
export default ChatMessage;