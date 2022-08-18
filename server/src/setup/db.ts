import { connect } from "mongoose";
import log from "loglevel";

const dbConnect = async (url: string) => {
  await connect(url);
  log.info("connection successful!");
};

export default dbConnect;