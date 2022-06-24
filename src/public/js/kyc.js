import axios from "axios";

// 전화번호 field 추가
const cust_key = sessionStorage.getItem("cust_key");
document.querySelector("#cust_key").setAttribute("value", cust_key);

// 이름 field 추가
const cust_name = sessionStorage.getItem("res_name");
document.querySelector("#cust_name").setAttribute("value", cust_name);

// type field 추가
const type = sessionStorage.getItem("type");
document.querySelector("#type").setAttribute("value", type);

const email = sessionStorage.getItem("email");
document.querySelector("#email").setAttribute("value", email);

// form data to JSON
const formKYC = document.querySelector("#formKYC");
const submitKYC = document.querySelector("#submitKYC");

const passedOrNot = async (e) => {
  if (document.querySelector("#understanding_negative").checked) {
    formKYC.setAttribute("method", "get");
    formKYC.setAttribute("action", "/notAllowed");
    formKYC.submit();
  } else {
    formKYC.submit();
  }
};

submitKYC.addEventListener("submit", passedOrNot);
