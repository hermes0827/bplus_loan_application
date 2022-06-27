import qs from "qs";
import axios from "axios";

const sendValidation = (req) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: "https://benefitplus.kr/api/loan_recpetion",
    data: qs.stringify({
      name: "validation",
      input: "validation",
      output: JSON.stringify(req.body),
    }),
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
