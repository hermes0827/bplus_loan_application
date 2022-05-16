import axios from "axios";

// 전화번호 field 추가
const cust_key = sessionStorage.getItem("cust_key");
document.querySelector("#cust_key").setAttribute("value", cust_key);

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
    };

    document.querySelectorAll("input").forEach((el) => {
      if (el.checked) {
        passedData[el.name] = el.id;
      }
    });

    const JSONData = {
      name: "validation",
      input: "validation",
      output: JSON.stringify(passedData),
    };

    await axios
      .post("https://benefitplus.kr/api/loan_recpetion", JSONData)
      .then((res) => {
        if (res.data.success) {
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