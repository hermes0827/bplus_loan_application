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

const taxEvasion = () => {
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

  axios({
    url: "/api/in0088000452",
    method: "post",
    headers: header,
    data: input,
  })
    .then((res) => {
      if (res.data.errYn === "Y") {
        return alert("지방세 납세증명 제출에 실패하였습니다.");
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
          name: "지방세 체납내역",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};

export default taxEvasion;
