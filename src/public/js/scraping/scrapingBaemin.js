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

const baemin = async () => {
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
  const userId = sessionStorage.getItem("baeminID");
  const userPw = sessionStorage.getItem("@bplus:baeminPW");

  const input = {
    userId: userId,
    userPw: userPw !== null ? encryptStorage.decryptString(userPw) : "",
    fromDate: date.BeforeOneYear(),
    toDate: date.yyyymmdd(),
  };

  await fetch("/api/in0048000123", {
    method: "POST",
    headers: header,
    body: JSON.stringify(input),
  })
    .then((res) => {
      const result = res.json();
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
          return alert("배달의민족 데이터 제출에 실패하였습니다.");
        }
      }
    })
    .catch((e) => alert("배달의민족 데이터 제출에 실패하였습니다."));
};

export default baemin;
