import axios from "axios";

const sendNateon = (name, phone_no) => {
  const data = `신용정보 송부가 시도되었습니다.(성함 : ${name} / 연락처: ${phone_no}). 담당자께서는 확인을 부탁드립니다.`;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    params: {
      content: data,
    },
    url: "https://teamroom.nate.com/api/webhook/46a81c1f/jHYjXRHCN5yLWo3ORzSqzKhy",
  };

  axios(options)
    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default sendNateon;
