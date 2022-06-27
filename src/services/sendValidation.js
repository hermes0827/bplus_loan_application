import axios from "axios";

const sendValidation = (req) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: "https://benefitplus.kr/api/loan_recpetion",
    params: {
      name: "validation",
      input: "validation",
      output: req,
    },
  };

  const result = axios(options)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

  return result;
};

export default sendValidation;
