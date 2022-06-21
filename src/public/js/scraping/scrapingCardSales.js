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

const cardSales = () => {
  Date.prototype.yyyymm = function () {
    let mm = this.getMonth(); // getMonth() is zero-based

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
    fromDate: date.BeforeOneYear(),
    toDate: date.yyyymm(),
    detailYn: "Y",
  };

  axios({
    url: "/api/in0048000123",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      const result = res.json();
      if (res.data !== null) {
        if (res.data.out.errYn === "N") {
          res.out.phone_no = sessionStorage.getItem("cust_key");
          fetch("https://benefitplus.kr/api/loan_recpetion", {
            method: "POST",
            body: new URLSearchParams({
              name: "카드매출",
              input: "",
              output: JSON.stringify(res),
            }),
          });
        } else {
          return alert("카드매출 조회에 실패하였습니다.");
        }
      }
    })
    .catch((e) => alert("카드매출 조회에 실패하였습니다."));
};
export default cardSales;

// 사업자등록증명
