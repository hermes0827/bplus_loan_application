import axios from "axios";
import header from "./scrapingHeader";

const baemin = () => {
  const presentYear = new Date().getFullYear();

  const input = {
    userId: "",
    userPw: "",
    fromDate: presentYear - 1,
    toDate: presentYear,
    detailYn: "Y",
  };

  axios({
    url: "/api/in0048000123",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      console.log(res);
      if (res.data.out.errYn === "Y") {
        return alert("배달의민족 거래내역 조회에 실패하였습니다.");
      } else {
        res.data.phone_no = sessionStorage.getItem("cust_key");
        return res.data;
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

export default baemin;
