import axios from "axios";
import header from "./scrapingHeader";

export const cardSalesValidator = () => {
  const presentYear = new Date().getFullYear();

  const ID = document.querySelector("#ID").value;
  const password = document.querySelector("#password").value;

  const input = {
    userId: ID,
    userPw: password,
    fromDate: presentYear - 1,
    toDate: presentYear,
  };

  axios({
    url: "/api/in0048000119",
    method: "post",
    headers: header,
    data: input,
  }).then((res) => {
    try {
      if (res.data.data.length === 0) {
        alert(
          "해당 계정 정보가 없습니다. ID/PW 확인 또는 여신금융협회 회원가입을 해주세요."
        );
      }
    } catch (e) {
      alert("해당하는 정보를 찾을 수 없습니다.");
    }
  });

  sessionStorage.setItem("cardSalesID", ID);
  sessionStorage.setItem("cardSalesPW", password);
};

export const baeminValidator = () => {
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
      if (res.data.errYn === "Y") {
        alert(res.data.errMsg);
      }
    } catch (e) {
      alert(e);
    }
  });

  sessionStorage.setItem("baeminID", ID);
  sessionStorage.setItem("baeminPW", password);
};

export const coupangEatsValidator = () => {
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
      if (res.data.errYn === "Y") {
        alert(res.data.errMsg);
      }
    } catch (e) {
      alert(e);
    }
  });

  sessionStorage.setItem("coupangEatsID", ID);
  sessionStorage.setItem("coupangEatsPW", password);
};
