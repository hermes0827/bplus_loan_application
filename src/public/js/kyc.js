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
  } else {
    formKYC.setAttribute("method", "get");
    formKYC.setAttribute("action", "/cert");

    const phone_no = document.querySelector("#cust_key").value;

    let passedData = {
      phone_no: phone_no,
      name: cust_name,
      type: type,
    };

    document.querySelectorAll("input").forEach((el) => {
      if (el.checked) {
        passedData[el.name] = el.id;
      }
    });

    await fetch("https://benefitplus.kr/api/loan_recpetion", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        name: "validation",
        input: "validation",
        output: JSON.stringify(passedData),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          formKYC.setAttribute("method", "get");
          formKYC.setAttribute("action", "/cert");
        } else {
          document.alert("서버가 응답하지 않습니다.");
          formKYC.setAttribute("method", "get");
          formKYC.setAttribute("action", "/kyc");
        }
      });
  }
};

formKYC.addEventListener("submit", passedOrNot);
