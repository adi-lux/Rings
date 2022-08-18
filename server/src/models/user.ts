import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  creation: Date,
  profilePage: { type: Schema.Types.ObjectId, ref: "Profile" },
  blogPage: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
  chatPage: [{ type: Schema.Types.ObjectId, ref: "ChatMessage" }],
  rings: [{ type: Schema.Types.ObjectId, ref: "Ring" }],
});

const User = model("User", UserSchema);

export default User;