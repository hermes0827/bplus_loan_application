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

const cardSalesValidator = () => {
  const presentYear = new Date().getFullYear();

  const ID = document.querySelector("#ID").value;
  const password = document.querySelector("#password").value;

  const input = {
    userId: ID,
    userPw: password,
  };

  axios({
    url: "/api/in0048000119",
    method: "post",
    headers: header,
    data: input,
  }).then((res) => {
    console.log(res);
    try {
      if (res.data.errYn === "N") {
        alert("로그인 성공");
        sessionStorage.setItem("cardSalesID", ID);
        encryptStorage.setItem("cardSalesPW", password);
        showConfirmModal();
      } else {
        throw e;
      }
    } catch (e) {
      alert("해당하는 정보를 찾을 수 없습니다.");
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
    try {
      if (res.data.errYn === "N") {
        alert("로그인 성공");
        sessionStorage.setItem("baeminID", ID);
        encryptStorage.setItem("baeminPW", password);
      } else {
        throw e;
      }
    } catch (e) {
      alert("해당하는 정보를 찾을 수 없습니다.");
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
    try {
      if (res.data.errYn === "N") {
        alert("로그인 성공");
        sessionStorage.setItem("coupangEatsID", ID);
        encryptStorage.setItem("coupangEatsPW", password);
      } else {
        throw e;
      }
    } catch (e) {
      alert("해당하는 정보를 찾을 수 없습니다.");
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
