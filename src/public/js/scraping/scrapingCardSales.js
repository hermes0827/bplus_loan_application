import axios from "axios";
import header from "./scrapingHeader";

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
  date.yyyymm();
  date.BeforeOneYear();

  const input = {
    userId: "",
    userPw: "",
    fromDate: BeforeOneYear(),
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
      try {
        if (res.data.out.errYn === "Y") {
          return alert("카드매출 조회에 실패하였습니다.");
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
          name: "certIncome",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};
export default cardSales;

// 사업자등록증명
