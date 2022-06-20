import businessRegistration from "./scraping/scrapingBusinessRegistration";
import taxEvasion from "./scraping/scrapingTaxEvasion";
import localTaxEvasion from "./scraping/scrapingLocalTaxEvasion";
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

// const save = async () => {
//   businessRegistration();
//   taxEvasion();
//   localTaxEvasion();
//   certIncome();
//   certVAT();
//   cardSales();
//   baemin();
//   coupangEats();
//   showConfirmModal();
// };

// save();

businessRegistration().then(
  taxEvasion().then(
    localTaxEvasion(
      certIncome.then(
        certVAT.then(
          cardSales.then(baemin.then(coupangEats.then(showConfirmModal())))
        )
      )
    )
  )
);
