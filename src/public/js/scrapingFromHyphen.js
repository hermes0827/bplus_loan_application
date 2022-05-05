import axios from "axios";
import { Buffer } from "buffer";

const headers = {
  "Content-Type": "application/json",
  "user-id": process.env.HYPHEN_USER_ID,
  // prettier-ignore
  "Hkey": process.env.HYPHEN_HKEY,
};

const cert = {
  signCert: sessionStorage.getItem("signCert"),
  signPri: sessionStorage.getItem("signKey"),
  signPw: sessionStorage.getItem("signPw"),
  signB64Pw: btoa(sessionStorage.getItem("signPw")),
};

const biz = {
  bizNo: sessionStorage.getItem("biz_no"),
  bizB64No: btoa(sessionStorage.getItem("biz_no")),
};

const taxEvasion = (cert, biz) => {
  axios({
    url: "/api/in0076000333",
    method: "post",
    headers: headers,
    data: {
      userId: "",
      userPw: "",
      signCert: cert.signCert,
      signPri: cert.signPri,
      signPw: cert.signPw,
      signB64Pw: cert.signB64Pw,
      agentId: "",
      agentPw: "",
      nMemberLoginYn: "",
      bizNo: biz.bizNo,
      bizB64No: biz.bizB64No,
      bizNm: "",
      telNo: "",
      hpNo: "",
      email: "",
      englCvaAplnYn: "",
      cvaDcumUseUsgCd: "99",
      cvaDcumSbmsOrgnClCd: "",
      resnoOpYn: "Y",
      adrOpYn: "Y",
      amtOpYn: "Y",
      cvaDcumGranMthdCd: "10",
      cerplsnRqsQty: "1",
      txnrmStrtYm: "2020",
      txnrmEndYm: "2020",
      pdfYn: "",
    },
  }).then(async (res) => {
    try {
      await console.log(res);
      sessionStorage.setItem(
        "res_number",
        res.data.out.out.data.cerpBscInfrDVO.cerCvaIsnNo
      );
    } catch (error) {
      alert("정보 입력이 잘못되었습니다.");
      return res.redirect("/");
    }
  });
};

taxEvasion(cert, biz);

// 체납내역

// 사업자등록증명
