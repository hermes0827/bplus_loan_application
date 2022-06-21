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

const coupangEats = () => {
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
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear(),
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
    dateFrom: date.BeforeOneYear(),
    dateTo: date.yyyymmdd(),
  };

  axios({
    url: "/api/in0048000123",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      if (res.data !== null) {
        if (res.data.out.errYn === "N") {
          res.out.phone_no = sessionStorage.getItem("cust_key");
          fetch("https://benefitplus.kr/api/loan_recpetion", {
            method: "POST",
            body: new URLSearchParams({
              name: "배달매출",
              input: "",
              output: JSON.stringify(res),
            }),
          });
        } else {
          return alert("쿠팡이츠 데이터 제출에 실패하였습니다.");
        }
      }
    })
    .catch((e) => alert("쿠팡이츠 데이터 제출에 실패하였습니다."));
};

export default coupangEats;
