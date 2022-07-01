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

const showConfirmModal = () => {
  document.getElementById("confirmModal").classList.remove("hidden");
  document.getElementById("confirmModal").classList.add("flex");
};

const cardSalesValidator = async () => {
  const presentYear = new Date().getFullYear();

  const ID = document.querySelector("#ID").value;
  const password = document.querySelector("#password").value;

  const input = {
    userId: ID,
    userPw: password,
  };

  await axios({
    url: "/api/in0048000119",
    method: "post",
    headers: header,
    data: input,
  }).then((res) => {
    if (res.data.out.errYn === "N") {
      alert("로그인 성공");
      sessionStorage.setItem("cardSalesID", ID);
      encryptStorage.setItem("cardSalesPW", password);
      showConfirmModal();
    } else {
      console.log(res.data.out.errMsg);
      alert(res.data.out.errMsg);
    }
  });
};

const baeminValidator = () => {
  const ID = document.querySelector("#ID").value;
  const password = document.querySelector("#password").value;

  const input = {
    userId: ID,
    userPw: password,
    storeId: "",
  };

  axios({
    url: "/api/in0022000062",
    method: "post",
    headers: header,
    data: input,
  }).then((res) => {
    if (res.data.errYn === "N") {
      alert("로그인 성공");
      sessionStorage.setItem("baeminID", ID);
      encryptStorage.setItem("baeminPW", password);
    } else {
      alert(res.data.errMsg);
    }
  });
};

const coupangEatsValidator = () => {
  const ID = document.querySelector("#ID").value;
  const password = document.querySelector("#password").value;

  const input = {
    userId: ID,
    userPw: password,
    storeId: "",
  };

  axios({
    url: "/api/in0024000080",
    method: "post",
    headers: header,
    data: input,
  }).then((res) => {
    if (res.data.errYn === "N") {
      alert("로그인 성공");
      sessionStorage.setItem("coupangEatsID", ID);
      encryptStorage.setItem("coupangEatsPW", password);
    } else {
      alert(res.data.errMsg);
    }
  });
};

if (document.getElementById("cardSales") !== null) {
  const cardSales = document.getElementById("cardSales");
  cardSales.addEventListener("click", cardSalesValidator);
} else if (document.getElementById("baemin") !== null) {
  const baemin = document.getElementById("baemin");
  baemin.addEventListener("click", baeminValidator);
} else if (document.getElementById("coupangEats") !== null) {
  const coupangEats = document.getElementById("coupangEats");
  coupangEats.addEventListener("click", coupangEatsValidator);
}
