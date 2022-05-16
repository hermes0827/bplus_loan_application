export const home = (req, res) => res.render("home");

export const apply = (req, res) => res.render("apply");

export const cardSales = (req, res) =>
  res.render("cardSales", { url: "https://www.cardsales.or.kr/signin" });

export const baemin = (req, res) =>
  res.render("baemin", { url: "https://ceo.baemin.com/find-account" });

export const coupangEats = (req, res) =>
  res.render("coupangEats", {
    url: "https://store.coupangeats.com/merchant/login",
  });

export const kyc = (req, res) => res.render("kyc");

export const notAllowed = (req, res) => res.render("notAllowed");

export const cert = (req, res) => res.render("cert");

export const scraping = (req, res) => res.render("scraping");
