import axios from "axios";
import header from "./scrapingHeader";

const taxEvasion = () => {
  const input = {
    signCert: sessionStorage.getItem("signCert"),
    signPri: sessionStorage.getItem("signKey"),
    signPw: sessionStorage.getItem("signPw"),
  };

  axios({
    url: "/api/in0076000305",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      if (res.data.out.errYn === "Y") {
        return alert("체납 내역 제출에 실패하였습니다.");
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
          name: "taxEvasion",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};

export default taxEvasion;
