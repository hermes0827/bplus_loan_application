import axios from "axios";
import header from "./scrapingHeader";

const businessRegistration = () => {
  const presentYear = new Date().getFullYear();

  const input = {
    signCert: sessionStorage.getItem("signCert"),
    signPri: sessionStorage.getItem("signKey"),
    signPw: sessionStorage.getItem("signPw"),
    signB64Pw: btoa(sessionStorage.getItem("signPw")),
    bizNo: sessionStorage.getItem("biz_no"),
    bizB64No: btoa(sessionStorage.getItem("biz_no")),
    cvaDcumUseUsgCd: "99",
    resnoOpYn: "Y",
    adrOpYn: "Y",
    amtOpYn: "Y",
    cvaDcumGranMthdCd: "10",
    cerplsnRqsQty: "1",
    txnrmStrtYm: presentYear - 2,
    txnrmEndYm: presentYear,
    pdfYn: "Y",
  };

  axios({
    url: "/api/in0076000333",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      if (res.data.out.errYn === "Y") {
        return alert("사업자등록증명 제출에 실패하였습니다.");
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
          name: "businessRegistration",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};

export default businessRegistration;

// 사업자등록증명
