import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendEmail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_HOST_USER, // 보내는 메일의 주소
      pass: process.env.EMAIL_HOST_PASSWORD, // 보내는 메일의 비밀번호
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BPLUS 🐝" <noreply@benefitplus.kr>', // sender address
    to: "namyeop.lee@benefitplus.kr", // list of receivers
    subject: "우리동네대출 자료 제출하기", // Subject line
    text: "링크 보기 - https://loan.benefitplus.kr/kcd", // plain text body
    html: "<b>안녕하세요, 비플러스입니다!🐝</b><p>아래 링크로 접속하여 자료를 제출해주세요.</p><a href='https://loan.benefitplus.kr/kcd' >자료제출</a>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

export default sendEmail;
