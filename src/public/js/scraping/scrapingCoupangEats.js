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
    userPw: userPw,
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
      try {
        if (res.data.out.errYn === "Y") {
          return alert("쿠팡이츠 거래내역 조회에 실패하였습니다.");
        } else {
          res.data.phone_no = sessionStorage.getItem("cust_key");
          return res.data;
        }
      } catch (e) {
        alert(e);
      }
    })
    .then((res) => {
      axios({
        url: "https://benefitplus.kr/api/loan_recpetion",
        method: "post",
        data: {
          name: "배달매출",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};

export default coupangEats;
