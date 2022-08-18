import { model, Schema } from "mongoose";

const ProfileSchema = new Schema({
  created: Date,
  updated: Date,
  content: String,
});

const Profile = model("Profile", ProfileSchema);
export default Profile;