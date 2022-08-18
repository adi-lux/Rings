import { RequestHandler } from "express";

const getHomePage: RequestHandler = (req, res, next) => {
  try {
    return res.json(req.auth.payload);
  } catch (e) {
    return next(e);
  }
};

const getProfile: RequestHandler = (req, res, next) => {
  try {
    return res.json(req.auth);
  } catch (e) {
    return next(e);
  }
};

const getError: RequestHandler = (req, res, next) => {
  try {
    return res.json({ data: "404 world!" });
  } catch (e) {
    return next(e);
  }
};

export default { getHomePage, getProfile, getError };