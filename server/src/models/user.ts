import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  creation: Date,
  profilePicture: String, // relative link to image
  profilePage: { type: Schema.Types.ObjectId, ref: 'Profile' },
  blogPage: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }],
  chatPage: { type: Schema.Types.ObjectId, ref: 'ChatPage' },
  friendList: [{ type: Schema.Types.ObjectId, ref: 'FriendList' }],
});

const User = model('User', UserSchema);

export default User;