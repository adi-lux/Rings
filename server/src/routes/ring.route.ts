import express from "express";
import ringController from "../controllers/ring.controller";

const router = express.Router();

router.get("/", ringController.getRings);
router.get("/:ringName", ringController.getRing);
router.post("/", ringController.postRing);
router.put("/:ringName", ringController.joinRing);
router.delete("/:ringName", ringController.deleteRing);

export default router;