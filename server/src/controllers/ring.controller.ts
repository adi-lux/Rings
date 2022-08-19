import { RequestHandler } from "express";
import RingService from "../services/ring.service";

const postRing: RequestHandler = async (req, res, next) => {
  try {
    const ring = req.body;
    const newRing = await RingService.postRing(ring);
    return res.json({ newRing });
  } catch (e) {
    return next(e);
  }
};

const getRings: RequestHandler = async (req, res, next) => {
  try {
    const rings = await RingService.getRings();
    return res.json({ rings });
  } catch (e) {
    return next(e);
  }
};

const getRing: RequestHandler = async (req, res, next) => {
  try {
    const name = req.params.ringName;
    const ring = await RingService.getRing(name);
    return res.json({ ring });
  } catch (e) {
    return next(e);
  }
};

const joinRing: RequestHandler = async (req, res, next) => {
  try {
    const name = req.params.ringname;
    const { username } = req.body;
    const newRing = await RingService.joinRing(name, username);
    return res.json({ newRing });
  } catch (e) {
    return next(e);
  }
  // TODO: Check to see if user is already in the ring
};

const deleteRing: RequestHandler = async (req, res, next) => {
  try {
    const name = req.params.ringName;
    const userList = await RingService.deleteRing(name);
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