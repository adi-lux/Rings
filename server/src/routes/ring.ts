import express from "express";
import ringController from "../controllers/ring";

const router = express.Router();

router.get("/", ringController.getRings);
router.post("/", ringController.postRing);
router.get("/:ringName", ringController.getRing);
router.put("/:ringName", ringController.joinRing);
router.delete("/:ringName", ringController.deleteRing);

export default router;