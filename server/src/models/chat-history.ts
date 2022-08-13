import { Schema, model } from 'mongoose';

const ChatHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  chats: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
});

const ChatHistory = model('ChatHistory', ChatHistorySchema);
export default ChatHistory;
