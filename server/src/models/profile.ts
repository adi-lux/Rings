import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  content: String,
});

const Profile = model('Profile', ProfileSchema);

export default Profile;
