import { RequestHandler } from 'express';

const getUsers: RequestHandler = (req, res, next) => res.json();
const postUser: RequestHandler = (req, res, next) => res.json()
const updateUser: RequestHandler = (req, res, next) => res.json()
const deleteUser: RequestHandler = (req, res, next) => res.json()

export default {
  getUsers, postUser, updateUser, deleteUser,
};