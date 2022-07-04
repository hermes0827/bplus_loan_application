import axios from "axios";
import header from "./scrapingHeader";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage(
  process.env.SESSION_STORAGE_KEY,
  {
    prefix: "@bplus",
    storageType: "sessionStorage",
  }
);

const cardSales = async () => {
  Date.prototype.yyyymm = function () {
    let mm = this.getMonth() + 2; // getMonth() is zero-based

    return [this.getFullYear(), (mm > 9 ? "" : "0") + mm].join("");
  };

  Date.prototype.BeforeOneYear = function () {
    let mm = this.getMonth() + 1; // getMonth() is zero-based

    return [this.getFullYear() - 1, (mm > 9 ? "" : "0") + mm].join("");
  };

  const date = new Date();
  const userId = sessionStorage.getItem("cardSalesID");
  const userPw = sessionStorage.getItem("@bplus:cardSalesPW");

  const input = {
    userId: userId,
    userPw: userPw !== null ? encryptStorage.decryptString(userPw) : "",
    fromDate: String(date.BeforeOneYear()),
    toDate: String(date.yyyymm()),
    detailYn: "Y",
  };

  await fetch("/api/in0048000123", {
    method: "POST",
    headers: header,
    body: JSON.stringify(input),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.out.errYn === "N") {
        res.phone_no = sessionStorage.getItem("cust_key");
        return res;
      } else {
        alert(res.out.errMsg);
        return res;
      }
    })
    .then((res) => {
      if (res !== undefined) {
        fetch("https://benefitplus.kr/api/loan_recpetion", {
          method: "POST",
          body: new URLSearchParams({
            name: "카드매출",
            input: "카드매출",
            output: JSON.stringify(res),
          }),
        });
      }
    });
};
export default cardSales;

// 사업자등록증명
