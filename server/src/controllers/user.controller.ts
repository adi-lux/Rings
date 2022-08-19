import { RequestHandler } from "express";
import UserService from "../services/user.service";

const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const userList = await UserService.getUsers();
    return res.json(userList);
  } catch (e) {
    return next(e);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await UserService.deleteUser(username);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};

const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { profilePage } = await UserService.getUser(username);
    return res.json({ profilePage });
  } catch (e) {
    return next(e);
  }
};
const postUser: RequestHandler = async (req, res, next) => {
  try {
    // TODO: SANITIZE BLOG
    const { content } = req.body;
    const { username } = req.params;
    const updated = await UserService.postUser(content, username);
    return res.json({ updated });
  } catch (e) {
    return next(e);
  }
};
const updateUser: RequestHandler = async (req, res, next) => {
  try {
    // TODO: SANITIZE
    const { username } = req.params;
    const { content } = req.body;
    const updated = await UserService.updateUser(username, content);
    return res.json({ updated });
  } catch (e) {
    return next(e);
  }
};

const getUserChat: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { chatPage } = await UserService.getUserChat(username);
    return res.json({ chatPage });
  } catch (e) {
    return next(e);
  }
};

const getUserMetadata: RequestHandler = (req, res, next) => {
  try {
    return res.json(req);
  } catch (e) {
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