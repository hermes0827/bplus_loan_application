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

const LocalTaxEvasion = async () => {
  const signCert = sessionStorage.getItem("@bplus:signCert");
  const signPri = sessionStorage.getItem("@bplus:signKey");
  const signPw = sessionStorage.getItem("@bplus:signPw");

  const input = {
    signCert: encryptStorage.decryptString(signCert),
    signPri: encryptStorage.decryptString(signPri),
    signPw: encryptStorage.decryptString(signPw),
    sido: "",
    sigg: "",
    roadStr: "",
    cusGb: "",
    bigo: "기타",
    telNo1: "000",
    telNo2: "0000",
    telNo3: "0000",
    bizNoExp: "1",
    nonMemberYn: "",
    reqSMS_YN: "",
    userName: "",
    bizNo: "",
    hpNo: "",
    regNum: "",
  };

  await fetch("/api/in0005000200", {
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
        alert(res.errMsg);
        return res;
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

export default LocalTaxEvasion;
