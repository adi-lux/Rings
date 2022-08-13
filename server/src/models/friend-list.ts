import { Schema, model } from 'mongoose';

const FriendListSchema = new Schema({
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sentRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pendingRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const FriendList = model('FriendList', FriendListSchema);
export default FriendList;
