import axios from "axios";

// 전화번호 field 추가
const cust_key = sessionStorage.getItem("cust_key");
document.querySelector("#cust_key").setAttribute("value", cust_key);

// form data to JSON
const formKYC = document.querySelector("#formKYC");
const submitKYC = document.querySelector("#submitKYC");

const passedOrNot = (e) => {
  if (document.querySelector("#understanding_negative").checked) {
    formKYC.setAttribute("method", "get");
    formKYC.setAttribute("action", "/notAllowed");
  } else {
    e.preventDefault();

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
      name: "적합성검토",
      input: "적합성검토",
      output: JSON.stringify(passedData),
    };

    console.log(JSONData);

    axios
      .post("https://stg.benefitplus.kr/api/loan_recpetion", JSONData)
      .then((res) => {
        if (res.data.success) {
          window.location.href = "/cert";
        } else {
          window.location.href = "/kyc";
        }
      });
  }
};

submitKYC.addEventListener("click", passedOrNot);
