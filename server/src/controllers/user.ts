import { RequestHandler } from 'express';

const getUsers: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const postUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const updateUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const deleteUser: RequestHandler = (req, res, next) => res.json({ bruh: 'incorrect' });
const getUserMetadata: RequestHandler = (req, res, next) => {
  res.json(req);
};
export default {
  getUsers, postUser, updateUser, deleteUser, getUserMetadata,
};
