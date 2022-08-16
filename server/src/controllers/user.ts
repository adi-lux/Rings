import { RequestHandler } from 'express';
import User from '../models/user';

const getUsers: RequestHandler = async (req, res, next) => {
  const userList = await User.find({}, { _id: 1 }).exec();
  res.json(userList);
};
const postUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const updateUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const deleteUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const getUserMetadata: RequestHandler = (req, res, next) => {
  res.json(req);
};
export default {
  getUsers, postUser, updateUser, deleteUser, getUserMetadata,
};
