import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  creation: Date,
  profilePage: String,
  blogPage: [{type: Schema.Types.ObjectId, ref: 'BlogPost'}],
  chatPage: [{type: Schema.Types.ObjectId, ref: 'ChatMessage'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const User = model('User', UserSchema);

export default User;