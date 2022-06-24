import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const sendKakao = (template, phone_no) => {
  const header = {
    "Content-Type": "application/json",
    // prettier-ignore
    "userId": "benefitplus",
  };

  const sendMessage = async (data) => {
    await axios
      .post("https://alimtalk-api.bizmsg.kr/v2/sender/send", [data], {
        headers: header,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (template === "applied_townloan") {
    const data = {
      message_type: "AT",
      phn: phone_no,
      profile: "ff5fb22002a94995674b06dc9d7f90325e09e1b6",
      tmplId: template,
      msg: "[비플러스]\n우리동네대출 신청 완료!\n\n담당자가 추가 서류 제출을 안내할 예정입니다.\n\n앗 혹시 공동인증서와 PC가 준비되어 있으신가요?\n\nhttps://loan.benefitplus.kr로 접속하시면\n번거로운 절차 없이,\n 빠르게 서류 제출이 가능합니다.",
      msgSms:
        "우리동네대출 신청 안내 - PC에서 'https://loan.benefitplus.kr/cert' 접속",
    };

    sendMessage(data);
  }

  if (template === "townloan_accepted") {
    const data = {
      message_type: "AT",
      phn: phone_no,
      profile: "ff5fb22002a94995674b06dc9d7f90325e09e1b6",
      tmplId: template,
      msg: "[비플러스]\n\n금융소비자보호법에 따라 고객님께서 시행하신 적합성 정보와 관련하여 다음 내용을 확인합니다.\n1. 고객님께서는 당사에 정확한 정보를 제공하였습니다.\n2. 고객님께서 제공하신 정보가 정확하지 않거나 달라질 경우, 적합성 판단이 달라질 수 있습니다.\n3. 적합성 정보 확인 결과, 비플러스 대출 이용이 가능합니다.\n\n우리동네대출 신청 완료!\n\n담당자가 추가 서류 제출을 안내할 예정입니다.\n\n앗 혹시 공동인증서와 PC가 준비되어 있으신가요?\n      https://loan.benefitplus.kr로 접속하시면\n번거로운 절차 없이,\n     빠르게 서류 제출이 가능합니다.\n\n문의 02-733-0703",
      msgSms:
        "[비플러스] 금융소비자보호법에 따라 고객님께서 시행하신 적합성 정보와 관련하여 다음 내용을 확인합니다. 1. 고객님께서는 당사에 정확한 정보를 제공하였습니다. 2. 고객님께서 제공하신 정보가 정확하지 않거나 달라질 경우, 적합성 판단이 달라질 수 있습니다. 3. 적합성 정보 확인 결과, 비플러스 대출 이용이 가능합니다. * 문의 02 733 0703",
    };

    sendMessage(data);
  }
};

export default sendKakao;
