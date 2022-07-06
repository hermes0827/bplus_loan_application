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

const certIncome = async () => {
  const signCert = sessionStorage.getItem("@bplus:signCert");
  const signPri = sessionStorage.getItem("@bplus:signKey");
  const signPw = sessionStorage.getItem("@bplus:signPw");
  const signB64Pw = sessionStorage.getItem("@bplus:signB64Pw");
  const res_no1 = sessionStorage.getItem("res_no1");
  const res_no2 = sessionStorage.getItem("@bplus:res_no2");
  const decrypted_res_no2 = encryptStorage.decryptString(res_no2);

  const input = {
    signCert: encryptStorage.decryptString(signCert),
    signPri: encryptStorage.decryptString(signPri),
    signPw: encryptStorage.decryptString(signPw),
    signB64Pw: encryptStorage.decryptString(signB64Pw),
    bizNo: String(res_no1 + decrypted_res_no2),
    cvaDcumUseUsgCd: "99",
    resnoOpYn: "Y",
    adrOpYn: "Y",
    amtOpYn: "Y",
    cvaDcumGranMthdCd: "10",
    cerplsnRqsQty: "1",
    txnrmStrtYm:
      new Date().getMonth() + 1 < 7
        ? String(new Date().getFullYear() - 2)
        : String(new Date().getFullYear() - 1),
    txnrmEndYm:
      new Date().getMonth() + 1 < 7
        ? String(new Date().getFullYear() - 2)
        : String(new Date().getFullYear() - 1),
    pdfYn: "N",
  };

  await fetch("/api/in0076000335", {
    method: "POST",
    headers: header,
    body: JSON.stringify(input),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.out.errYn === "N") {
        res.phone_no = sessionStorage.getItem("cust_key");
        return res;
      } else {
        alert(res.out.errMsg);
        return res;
      }
    })
    .then((res) => {
      if (res !== undefined) {
        fetch("https://benefitplus.kr/api/loan_recpetion", {
          method: "POST",
          body: new URLSearchParams({
            name: "소득금액증명원",
            input: "소득금액증명원",
            output: JSON.stringify(res),
          }),
        });
      }
    });
};

export default certIncome;

// 사업자등록증명
