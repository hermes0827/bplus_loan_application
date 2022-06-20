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
        url: "/bplus",
        method: "post",
        data: {
          name: "체납내역",
          input: "",
          output: JSON.stringify(res),
        },
      });
    });
};

export default taxEvasion;
