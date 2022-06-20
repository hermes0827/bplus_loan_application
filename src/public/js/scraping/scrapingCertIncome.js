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

const certIncome = () => {
  const presentYear = new Date().getFullYear();

  const signCert = sessionStorage.getItem("@bplus:signCert");
  const signPri = sessionStorage.getItem("@bplus:signKey");
  const signPw = sessionStorage.getItem("@bplus:signPw");
  const signB64Pw = sessionStorage.getItem("@bplus:signB64Pw");

  const input = {
    signCert: encryptStorage.decryptString(signCert),
    signPri: encryptStorage.decryptString(signPri),
    signPw: encryptStorage.decryptString(signPw),
    signB64Pw: encryptStorage.decryptString(signB64Pw),
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
    url: "/api/in0076000335",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      if (res.data.out.errYn === "Y") {
        return alert("소득금액증명 제출에 실패하였습니다.");
      } else {
        res.data.phone_no = sessionStorage.getItem("cust_key");
        return res.data;
      }
    })
    .then((res) => {
      axios({
        url: "/bplus",
        method: "post",
        data: {
          name: "소득금액증명원",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};

export default certIncome;

// 사업자등록증명
