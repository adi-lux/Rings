import { RequestHandler } from "express";
import Ring from "../models/ring.model";
import User from "../models/user.model";

const postRing: RequestHandler = async (req, res, next) => {
  try {
    const newRing = await new Ring({
      name: req.body.name,
      private: req.body.privacy,
      members: [req.body.username],
    }).save();
    await User.findByIdAndUpdate(req.body.username, {
      $push: { rings: newRing },
    }).exec();
    return res.json({ newRing });
  } catch (e) {
    return next(e);
  }
};

const getRings: RequestHandler = async (req, res, next) => {
  try {
    const rings = await Ring.find().exec();
    return res.json({ rings });
  } catch (e) {
    return next(e);
  }
};

const getRing: RequestHandler = async (req, res, next) => {
  try {
    const ring = await Ring.findOne({ name: req.params.ringName }).exec();
    return res.json({ ring });
  } catch (e) {
    return next(e);
  }
};

const joinRing: RequestHandler = async (req, res, next) => {
  try {
    const newRing = await Ring.findOneAndUpdate(
      { name: req.params.ringName },
      { $push: { members: req.body.username } }
    );
    await User.findByIdAndUpdate(req.body.username, {
      $push: { rings: newRing },
    }).exec();
    return res.json({ newRing });
  } catch (e) {
    return next(e);
  }
  // TODO: Check to see if user is already in the ring
};

const deleteRing: RequestHandler = async (req, res, next) => {
  try {
    const deletedRing = await Ring.findOneAndDelete({
      name: req.params.ringName,
    });
    const userList = await User.find({
      rings: { $elemMatch: { name: deletedRing.name } },
    }).exec();
    userList.forEach((user) => {
      User.findByIdAndUpdate(user._id, { $pull: { rings: deletedRing } });
    });
    return res.json({ userList });
  } catch (e) {
    return next(e);
  }
};

export default {
  postRing,
  joinRing,
  deleteRing,
  getRings,
  getRing,
};