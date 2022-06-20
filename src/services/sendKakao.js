import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendKakao = async () => {
  const header = {
    "Content-Type": "application/json",
    // prettier-ignore
    "userId": "benefitplus",
  };

  const data = {
    message_type: "AT",
    phn: " 8201091227164",
    profile: "ff5fb22002a94995674b06dc9d7f90325e09e1b6",
    msg: "우리동네대출 알림톡 테스트입니다",
    title: "우리동네대출 신청 안내",
    msgSms:
      "우리동네대출 신청 안내 - PC에서 'https://loan.benefitplus.kr' 접속",
  };

  try {
    await axios
      .post("https://dev-alimtalk-api.bizmsg.kr:1443/v2/sender/send", data)
      .then(console.log("success"));
  } catch (e) {
    console.log(e);
  }
};

export default sendKakao;
