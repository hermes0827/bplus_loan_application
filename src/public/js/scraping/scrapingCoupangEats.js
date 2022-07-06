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

const coupangEats = async () => {
  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("");
  };

  Date.prototype.BeforeOneYear = function () {
    var mm = this.getMonth() + 2; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear() - 1,
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("");
  };

  const date = new Date();
  const userId = sessionStorage.getItem("coupangEatsID");
  const userPw = sessionStorage.getItem("@bplus:coupangEatsPW");

  const input = {
    userId: userId,
    userPw: userPw !== null ? encryptStorage.decryptString(userPw) : "",
    dateFrom: String(date.BeforeOneYear()),
    dateTo: String(date.yyyymmdd()),
  };

  await fetch("/api/in0024000080", {
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
        alert("쿠팡이츠 매출 조회에 실패하였습니다.");
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

export default coupangEats;
