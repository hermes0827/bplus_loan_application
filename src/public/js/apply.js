import CryptoJS from "crypto-js";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage(
  process.env.SESSION_STORAGE_KEY,
  {
    prefix: "@bplus",
    storageType: "sessionStorage",
  }
);

const button = document.getElementById("sendNice");
const checkbox = document.getElementById("privacyCheckbox");

document.getElementById("res_name").onchange = (e) => {
  sessionStorage.setItem("res_name", e.target.value);
};
document.getElementById("res_no1").onchange = (e) => {
  sessionStorage.setItem("res_no1", e.target.value);
};
document.getElementById("res_no2").onchange = (e) => {
  encryptStorage.setItem("res_no2", e.target.value);
};
document.getElementById("cust_key").onchange = (e) => {
  sessionStorage.setItem("cust_key", e.target.value);
};
document.getElementById("biz_no").onchange = (e) => {
  sessionStorage.setItem("biz_no", e.target.value);
};
document.getElementById("email").onchange = (e) => {
  sessionStorage.setItem("email", e.target.value);
};

const fnSendData = async (sJsonText) => {
  const popup = window.open(
    "",
    "authSend",
    "width=1030, height=750, scrollbars,resizable"
  );
  document.form.target = "authSend";
  document.form.action =
    "https://www.creditinfo.co.kr:9004/nicecredit/auth/authSendGateway.cb";
  await document.form.submit();
  window.location.href = "/kyc";
};

const fnCheckAuth = async () => {
  const user_id = process.env.NICE_USER_ID;
  const login_id = process.env.NICE_LOGIN_ID;
  const passwd = process.env.NICE_USER_PW;
  const res_no1 = sessionStorage.getItem("res_no1");
  const res_no2 = sessionStorage.getItem("@bplus:res_no2");
  const res_name = sessionStorage.getItem("res_name");
  const cust_key = sessionStorage.getItem("cust_key");
  const biz_no = sessionStorage.getItem("biz_no");
  const return_url = "";
  const return_target = "";
  const time_stamp = Date.now().toString();
  const stKey = process.env.NICE_ENCODING_KEY;
  const stIv = process.env.NICE_IV_KEY;

  const decrypted_res_no2 = encryptStorage.decryptString(res_no2);

  const res_no = res_no1 + decrypted_res_no2;
  const B64res_no = btoa(res_no);

  encryptStorage.setItem("res_no", res_no);
  encryptStorage.setItem("B64res_no", B64res_no);

  const sendJsonData =
    '{"request" : [{  "passwd" : "' +
    passwd +
    '", "res_no1" : "' +
    res_no1 +
    '", "res_no2" : "' +
    decrypted_res_no2 +
    '", "res_name" : "' +
    res_name +
    '", "cust_key" : "' +
    cust_key +
    '", "return_url" : "' +
    return_url +
    '", "return_target" : "' +
    return_target +
    '", "time_stamp" : "' +
    time_stamp +
    '" }] }';

  const key = CryptoJS.enc.Utf8.parse(stKey);
  const iv = CryptoJS.enc.Utf8.parse(stIv);

  const encrypted = CryptoJS.AES.encrypt(sendJsonData, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
  });

  document.getElementById("user_id").value = user_id;
  document.getElementById("login_id").value = login_id;
  document.getElementById("encrypt_data").value = encrypted;
  document.getElementById("time_stamp").value = time_stamp;

  if (
    document.getElementById("res_name").value === "" ||
    document.getElementById("res_no1").value === "" ||
    document.getElementById("res_no2").value === "" ||
    document.getElementById("cust_key").value === "" ||
    document.getElementById("biz_no").value === "" ||
    checkbox.checked === false
  ) {
    button.addEventListener("click", (e) => e.preventDefault());
    document.getElementById("errorModal").classList.remove("hidden");
    document.getElementById("errorModal").classList.remove("absolute");
    document.getElementById("errorModal").classList.add("fixed");
  } else if (sessionStorage.getItem("cust_key") !== "") {
    fnSendData(encrypted);
  }
};

const errorModalHandler = () => {
  document.getElementById("errorModal").classList.remove("fixed");
  document.getElementById("errorModal").classList.add("hidden");
};

button.addEventListener("click", fnCheckAuth);
document
  .getElementById("errorModal")
  .addEventListener("click", errorModalHandler);
