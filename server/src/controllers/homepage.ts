import { RequestHandler } from 'express';

const getHomePage: RequestHandler = (req, res, next) => res.json();
const postHomePage: RequestHandler = (req, res, next) => res.json();
const updateHomePage: RequestHandler = (req, res, next) => res.json();
const deleteHomePage: RequestHandler = (req, res, next) => res.json();

export default {
  getHomePage, postHomePage, updateHomePage, deleteHomePage,
};
