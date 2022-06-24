import axios from "axios";

const sendValidation = (req) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: "https://benefitplus.kr/api/loan_recpetion",
    params: {
      name: "validation",
      input: "validation",
      output: JSON.stringify(req),
    },
  };

  const sendKYC = axios(options)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

  return sendKYC;
};

export default sendValidation;
