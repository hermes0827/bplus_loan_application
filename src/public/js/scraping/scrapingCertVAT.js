import header from "./scrapingHeader";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage(
  process.env.SESSION_STORAGE_KEY,
  {
    prefix: "@bplus",
    storageType: "sessionStorage",
  }
);

const certVAT = async () => {
  Date.prototype.yyyymm = function () {
    let mm = this.getMonth() + 1; // getMonth() is zero-based

    return [this.getFullYear(), (mm > 9 ? "" : "0") + mm].join("");
  };

  Date.prototype.BeforeOneYear = function () {
    let mm = this.getMonth() + 2; // getMonth() is zero-based

    return [this.getFullYear() - 1, (mm > 9 ? "" : "0") + mm].join("");
  };

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
    telNo: sessionStorage.getItem("cust_key"),
    cvaDcumUseUsgCd: "99",
    resnoOpYn: "Y",
    adrOpYn: "Y",
    amtOpYn: "Y",
    cvaDcumGranMthdCd: "10",
    cerplsnRqsQty: "1",
    txnrmStrtYm: String(date.BeforeOneYear()),
    txnrmEndYm: String(date.yyyymm()),
    pdfYn: "N",
  };

  await fetch("/api/in0076000332", {
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
        alert("부가세 과표증명원 제출에 실패하였습니다.");
        res.phone_no = sessionStorage.getItem("cust_key");
        return res;
      }
    })
    .then((res) => {
      if (res !== undefined) {
        fetch("https://benefitplus.kr/api/loan_recpetion", {
          method: "POST",
          body: new URLSearchParams({
            name: "부가가치세과세표준증명",
            input: "부가가치세과세표준증명",
            output: JSON.stringify(res),
          }),
        });
      }
    });
};

export default certVAT;
