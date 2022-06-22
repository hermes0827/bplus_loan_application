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

const taxEvasion = async () => {
  const signCert = sessionStorage.getItem("@bplus:signCert");
  const signPri = sessionStorage.getItem("@bplus:signKey");
  const signPw = sessionStorage.getItem("@bplus:signPw");

  const input = {
    signCert: encryptStorage.decryptString(signCert),
    signPri: encryptStorage.decryptString(signPri),
    signPw: encryptStorage.decryptString(signPw),
    juso_code: "1100000000",
    juso_road: "1100000000",
    juso_priNo: "1100000000",
    juso_subNo: "1100000000",
  };

  await fetch("/api/in0088000452", {
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
        return alert("지방세 납세증명 제출에 실패하였습니다.");
      }
    })
    .then((res) => {
      fetch("https://benefitplus.kr/api/loan_recpetion", {
        method: "POST",
        body: new URLSearchParams({
          name: "지방세 체납내역",
          input: "지방세 체납내역",
          output: JSON.stringify(res),
        }),
      });
    });
};

export default taxEvasion;
