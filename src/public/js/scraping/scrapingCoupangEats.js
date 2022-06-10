import axios from "axios";
import header from "./scrapingHeader";

const coupangEats = () => {
  const input = {
    userId: "",
    userPw: "",
    storeId: "",
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
          return alert("쿠팡이츠 거래내역 조회에 실패하였습니다다.");
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

export default coupangEats;
