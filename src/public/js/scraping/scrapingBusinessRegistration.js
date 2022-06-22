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

const businessRegistration = async () => {
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
    txnrmStrtYm: String(presentYear - 2),
    txnrmEndYm: String(presentYear),
    pdfYn: "Y",
  };

  await fetch("/api/in0076000333", {
    method: "POST",
    headers: header,
    body: JSON.stringify(input),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.errYn === "N") {
        res.phone_no = sessionStorage.getItem("cust_key");
        return res;
      } else {
        alert("사업자등록증명 제출에 실패하였습니다.");
        res.phone_no = sessionStorage.getItem("cust_key");
        return res;
      }
    })
    .then((res) => {
      fetch("https://benefitplus.kr/api/loan_recpetion", {
        method: "POST",
        body: new URLSearchParams({
          name: "사업자등록증명",
          input: "사업자등록증명",
          output: JSON.stringify(res),
        }),
      });
    });
};

export default businessRegistration;
