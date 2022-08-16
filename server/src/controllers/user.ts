import { RequestHandler } from 'express';
import User from '../models/user';
import BlogPost from '../models/blog-post';
import profile from '../models/profile';
import Profile from '../models/profile';

const getUsers: RequestHandler = async (req, res, next) => {
  const userList = await User.find({}, { _id: 1 }).exec();
  res.json(userList);
};

const deleteUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });

const getUser: RequestHandler = async (req, res, next) => {
  const {profilePage} = await User.findById(req.params.username).populate('profilePage').exec();
  res.json({profilePage});
};
const postUser: RequestHandler = async (req, res, next) => {
  // TODO: SANITIZE BLOG
  const userProfile = await new Profile({
    content: req.body.content,
    updated: new Date(),
    created: new Date(),
  }).save();
  const updated = await User.findByIdAndUpdate(req.params.username, {profilePage: userProfile}).exec();
  res.json({updated})
};
const updateUser: RequestHandler = async (req, res, next) => {
  // TODO: SANITIZE
  const userProfile = await User.findById(req.params.username).populate('profilePage').exec()
  const updated = await Profile.findByIdAndUpdate((userProfile.profilePage._id), {
    content: req.body.content,
    updated: new Date(),
  }).exec();
  console.log(updated);
  res.json({updated});
};

const getUserMetadata: RequestHandler = (req, res, next) => {
  res.json(req);
};
export default {
  getUsers, getUser, postUser, updateUser, deleteUser, getUserMetadata,
};