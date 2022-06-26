import open from "open";
import sendEmail from "../services/sendEmail";
import sendKakao from "../services/sendKakao";
import sendNateon from "../services/sendNateon";
import sendValidation from "../services/sendValidation";

export const home = (req, res) => {
  res.render("home");
};

export const homeKCD = (req, res) => {
  res.render("homeKCD");
};

export const apply = async (req, res) => {
  res.render("apply");
};

export const cardSales = (req, res) =>
  res.render("cardSales", { url: "https://www.cardsales.or.kr/signin" });

export const baemin = (req, res) =>
  res.render("baemin", { url: "https://ceo.baemin.com/find-account" });

export const coupangEats = (req, res) =>
  res.render("coupangEats", {
    url: "https://store.coupangeats.com/merchant/login",
  });

export const getKyc = (req, res) => {
  res.render("kyc");
};

export const postKyc = (req, res) => {
  res.render("kyc");
};

export const notAllowed = (req, res) => res.render("notAllowed");

export const postCert = (req, res) => {
  // const sendKYC = sendValidation(req.body);

  // if (sendKYC.data.success) {
  // }
  // sendKakao("townloan_accepted", req.body.cust_key);
  // sendNateon(req.body.name, req.body.phone_no);
  // sendEmail(req.body.email);
  // sendValidation(req.body);
  setTimeout(() => {
    res.render("cert");
  }, 2000);
};

export const scraping = (req, res) => {
  res.render("scraping");
};
