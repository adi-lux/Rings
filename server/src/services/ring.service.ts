import log from "loglevel";
import Ring from "../models/ring.model";
import User from "../models/user.model";

interface BlogRing {
  name: string;
  privacy: boolean;
  username: string;
}

const postRing = async (ring: BlogRing) => {
  try {
    const newRing = await new Ring({
      name: ring.name,
      private: ring.privacy,
      members: [ring.username],
    }).save();
    await User.findByIdAndUpdate(ring.username, {
      $push: { rings: newRing },
    }).exec();
    return newRing;
  } catch (e) {
    log.trace(`Error occurred while creating a ring:\n${e}`);
    throw Error(e);
  }
};

const getRings = async () => {
  try {
    return await Ring.find().exec();
  } catch (e) {
    log.trace(`Error occured while retrieving ring list:\n${e}`);
    throw Error(e);
  }
};

const getRing = async (name: string) => {
  try {
    return await Ring.findOne({ name }).exec();
  } catch (e) {
    log.trace(`Error occurred while retrieving ring list:\n${e}`);
    throw Error(e);
  }
};

const joinRing = async (name: string, username: string) => {
  try {
    const newRing = await Ring.findOneAndUpdate(
      { name },
      { $push: { members: username } }
    );
    await User.findByIdAndUpdate(username, {
      $push: { rings: newRing },
    }).exec();
    return newRing;
  } catch (e) {
    log.trace(`Error occurred while joining ring:\n${e}`);
    throw Error(e);
  }
  // TODO: Check to see if user is already in the ring
};

const deleteRing = async (name: string) => {
  try {
    const deletedRing = await Ring.findOneAndDelete({
      name,
    });
    const userList = await User.find({
      rings: { $elemMatch: { name } },
    }).exec();
    userList.forEach((user) => {
      User.findByIdAndUpdate(user._id, { $pull: { rings: deletedRing } });
    });
    return userList;
  } catch (e) {
    log.trace(`Error occurred while deleting ring:\n${e}`);
    throw Error(e);
  }
};

export default {
  postRing,
  joinRing,
  deleteRing,
  getRings,
  getRing,
};