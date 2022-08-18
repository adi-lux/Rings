import express from "express";
import homepageController from "../controllers/homepage.controller";

const router = express.Router();

router.get("/", homepageController.getHomePage);
router.get("/profile", homepageController.getProfile);
router.get("*", homepageController.getError);

export default router;