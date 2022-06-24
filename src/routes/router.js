import express from "express";
import {
  home,
  homeKCD,
  apply,
  cardSales,
  baemin,
  coupangEats,
  postCert,
  scraping,
  getKyc,
  postKyc,
  notAllowed,
  notFound,
} from "../controllers/controller";

const router = express.Router();

router.get("/", home);
router.get("/kcd", homeKCD);
router.get("/apply", apply);
router.get("/cardsales", cardSales);
router.get("/baemin", baemin).post("/baemin", baemin);
router.get("/coupangEats", coupangEats).post("/coupangEats", coupangEats);
router.get("/kyc", getKyc).post("/kyc", postKyc);
router.get("/notAllowed", notAllowed);
router.post("/cert", postCert);
router.get("/scraping", scraping).post("/scraping", scraping);

export default router;
