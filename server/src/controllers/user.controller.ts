import { RequestHandler } from "express";
import User from "../models/user.model";
import Profile from "../models/profile.model";
import log from "loglevel";

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const userList = await User.find({}, { _id: 1 }).exec();
    log.info(`Acquired user list: ${userList}`);

    return res.json(userList);
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> getUsers");
    return next(e);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.username);
    log.info(`Deleted user: ${user}`);
    return res.json({ user });
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> deleteUser");
    return next(e);
  }
};

const getUser: RequestHandler = async (req, res, next) => {
  try {
    log.info(req.params);
    const { profilePage } = await User.findById(req.params.username)
      .populate("profilePage")
      .exec();
    return res.json({ profilePage });
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> getUser");
    return next(e);
  }
};
const postUser: RequestHandler = async (req, res, next) => {
  try {
    // TODO: SANITIZE BLOG
    const userProfile = await new Profile({
      content: req.body.content,
      updated: new Date(),
      created: new Date(),
      rings: [],
    }).save();
    const updated = await User.findByIdAndUpdate(req.params.username, {
      profilePage: userProfile,
    }).exec();
    log.info(`New User Profile: ${req.params.username}`);

    return res.json({ updated });
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> postUser");
    return next(e);
  }
};
const updateUser: RequestHandler = async (req, res, next) => {
  try {
    // TODO: SANITIZE
    const userProfile = await User.findById(req.params.username)
      .populate("profilePage")
      .exec();
    const updated = await Profile.findByIdAndUpdate(
      userProfile.profilePage._id,
      {
        content: req.body.content,
        updated: new Date(),
      }
    ).exec();
    return res.json({ updated });
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> updateUser");
    return next(e);
  }
};

const getUserChat: RequestHandler = async (req, res, next) => {
  try {
    const { chatPage } = await User.findById(req.params.username).populate(
      "chatPage"
    );
    return res.json({ chatPage });
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> getUserChat");
    return next(e);
  }
};

const getUserMetadata: RequestHandler = (req, res, next) => {
  try {
    console.log(`user metadata: ${req}`);
    return res.json(req);
  } catch (e) {
    log.error("Error in src/controllers/user.ts -> getUserMetadata");
    return next(e);
  }
};
export default {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
  getUserMetadata,
  getUserChat,
};