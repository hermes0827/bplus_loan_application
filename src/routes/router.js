import express from "express";
import { home, apply, cert } from "../controllers/controller";

const router = express.Router();

router.get("/", home);
router.get("/apply", apply);
router.get("/cert", cert);

export default router;
