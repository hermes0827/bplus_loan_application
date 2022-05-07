import express from "express";
import {
  home,
  apply,
  cert,
  scraping,
  kyc,
  notAllowed,
} from "../controllers/controller";

const router = express.Router();

router.get("/", home);
router.get("/apply", apply);
router.get("/kyc", kyc);
router.get("/notAllowed", notAllowed);
router.get("/cert", cert);
router.get("/scraping", scraping);

export default router;
