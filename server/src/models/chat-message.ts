import { Schema, model } from 'mongoose';

const ChatMessageSchema = new Schema({
  roomOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  commenter: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date,
  content: String,
});

const ChatMessage = model('ChatMessage', ChatMessageSchema);
export default ChatMessage;
