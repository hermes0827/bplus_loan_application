import express from "express";
import { home } from "../controllers/controller";

const router = express.Router();

router.get("/", home);

export default router;
