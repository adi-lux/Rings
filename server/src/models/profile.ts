import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
});

const Profile = model('Profile', ProfileSchema);

export default Profile;
