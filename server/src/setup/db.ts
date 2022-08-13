import { connect } from 'mongoose';

const dbConnect = async (url: string) => {
  try {
    await connect(url);
    console.log('connection successful!');
  } catch (e) {
    console.log('error connecting to MongoDB');
  }
};

export default dbConnect;