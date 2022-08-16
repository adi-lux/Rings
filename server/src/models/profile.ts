import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  created: Date,
  updated: Date,
  content: String,
});

const Profile = model('Profile', ProfileSchema);
//TODO: upgrade profile capabilities
export default Profile;