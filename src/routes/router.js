import express from "express";
import { home, apply } from "../controllers/controller";

const router = express.Router();

router.get("/", home);
router.get("/apply", apply);

export default router;
