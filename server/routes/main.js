import express from "express"
import { getPositions, getPositionById } from "../controllers/jobs.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

router.get("/positions", verifyToken, getPositions);
router.get("/position/:id", verifyToken, getPositionById);

export default router;