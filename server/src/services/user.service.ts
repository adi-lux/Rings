import log from "loglevel";
import User from "../models/user.model";
import Profile from "../models/profile.model";

const getUsers = async () => {
  try {
    return await User.find({}, { _id: 1 }).exec();
  } catch (e) {
    log.trace(`Error while getting userList:\n${e}`);
    throw Error(e);
  }
};

const deleteUser = async (username: string) => {
  try {
    return await User.findByIdAndDelete(username);
  } catch (e) {
    log.trace(`Error while deleting user:\n${e}`);
    throw Error(e);
  }
};

const getUser = async (username: string) => {
  try {
    return await User.findById(username).populate("profilePage").exec();
  } catch (e) {
    log.trace(`Error while getting user:\n${e}`);
    throw Error(e);
  }
};
const postUser = async (content: string, username: string) => {
  try {
    const userProfile = await new Profile({
      content,
      updated: new Date(),
      created: new Date(),
      rings: [],
    }).save();
    return await User.findByIdAndUpdate(username, {
      profilePage: userProfile,
    }).exec();
  } catch (e) {
    log.trace(`Error while getting user:\n${e}`);
    throw Error(e);
  }
};
const updateUser = async (username: string, content: string) => {
  try {
    const userProfile = await User.findById(username)
      .populate("profilePage")
      .exec();
    return await Profile.findByIdAndUpdate(userProfile.profilePage._id, {
      content,
      updated: new Date(),
    }).exec();
  } catch (e) {
    log.trace(`Error while updating user:\n${e}`);
    throw Error(e);
  }
};

const getUserChat = async (username: string) => {
  try {
    return await User.findById(username).populate("chatPage");
  } catch (e) {
    log.trace(`Error while getting user:\n${e}`);
    throw Error(e);
  }
};

export default {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
  getUserChat,
};