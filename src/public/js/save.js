import businessRegistration from "./scraping/scrapingBusinessRegistration";
import taxEvasion from "./scraping/scrapingTaxEvasion";
import localTaxEvasion from "./scraping/scrapingLocalTaxEvasion";
import localTaxEvasion_gov24 from "./scraping/scrapingLocalTaxEvasion_gov24";
import certIncome from "./scraping/scrapingCertIncome";
import certVAT from "./scraping/scrapingCertVAT";
import cardSales from "./scraping/scrapingCardSales";
import baemin from "./scraping/scrapingBaemin";
import coupangEats from "./scraping/scrapingCoupangEats";

const delay = 10000;

const showConfirmModal = () => {
  document.getElementById("confirmModal").classList.remove("hidden");
  document.getElementById("confirmModal").classList.add("flex");
};

const showerrorModal = () => {
  document.getElementById("errorModal").classList.remove("fixed");
  document.getElementById("errorModal").classList.add("hidden");
};

const save = async () => {
  await businessRegistration();
  await certIncome();
  await certVAT();
  taxEvasion();
  // localTaxEvasion_gov24();
  localTaxEvasion();
  cardSales();
  baemin();
  coupangEats();
};

save();
setTimeout(showConfirmModal, 60000);
