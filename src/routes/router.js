import express from "express";
import {
  home,
  homeKCD,
  apply,
  cardSales,
  baemin,
  coupangEats,
  cert,
  scraping,
  kyc,
  notAllowed,
  notFound,
} from "../controllers/controller";

const router = express.Router();

router.get("/", home);
router.get("/kcd", homeKCD);
router.get("/apply", apply);
router.get("/cardsales", cardSales);
router.get("/baemin", baemin);
router.get("/coupangEats", coupangEats);
router.get("/kyc", kyc);
router.get("/notAllowed", notAllowed);
router.get("/cert", cert);
router.get("/scraping", scraping);

export default router;
