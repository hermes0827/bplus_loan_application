import businessRegistration from "./scraping/scrapingBusinessRegistration";
import taxEvasion from "./scraping/scrapingTaxEvasion";
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

businessRegistration();
taxEvasion();
certIncome();
certVAT();
cardSales();
baemin();
coupangEats();

setTimeout(() => {
  showConfirmModal();
}, delay);
