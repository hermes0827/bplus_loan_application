import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "user-id": process.env.HYPHEN_USER_ID,
  // prettier-ignore
  "Hkey": process.env.HYPHEN_HKEY,
};

axios({
  url: "/api/in0076000333",
  method: "post",
  headers: headers,
  data: {
    userId: "",
    userPw: "",
    signCert:
      "MIIFrzCCBJegAwIBAgIELEclADANBgkqhkiG9w0BAQsFADBSMQswCQYDVQQGEwJrcjEQMA4GA1UECgwHeWVzc2lnbjEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRowGAYDVQQDDBF5ZXNzaWduQ0EgQ2xhc3MgMjAeFw0yMTExMDkxNTAwMDBaFw0yMjExMTAxNDU5NTlaMHExCzAJBgNVBAYTAmtyMRAwDgYDVQQKDAd5ZXNzaWduMRQwEgYDVQQLDAtwZXJzb25hbDRJQjEMMAoGA1UECwwDU0hCMSwwKgYDVQQDDCPsnbTrgqjsl70oKTAwODgwNDcyMDEwMDcwMjE4ODAwMDgxMjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIcesX0Y6skrzdrCBr/TmjWEsBMN5BOkoNmIYCGKyOU5xMw4rbsyQaodvPllcvCgU0+Wmwvo87UHeftuCIFs5brGP6TVxvxAbl1tMHZE33EMqOGrvXjdaW9QGscLGdlQu5LQgvU7nC+eHK9Fv5iQZPiBZ+V7V7kiXjW6QFRiGCR/y/BxjANFUhxS+Xb8KB9mvpzEhvTZzg7kG1FTGoU6OcYHX9LaE91i+HpfFlDWAVtsHCsskrG5tlER5FEdKUg+/f8Y2qX6OAvy9z28xDb5Qx4FFHieVBxFXMM2kuyvrobNW55fD2og0jrCEady8lWVsUjB/FGHv5D3Tdrjr++qCQcCAwEAAaOCAmwwggJoMIGPBgNVHSMEgYcwgYSAFO/cRNLGjcAOozjAfJPGw0G/So/woWikZjBkMQswCQYDVQQGEwJLUjENMAsGA1UECgwES0lTQTEuMCwGA1UECwwlS29yZWEgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkgQ2VudHJhbDEWMBQGA1UEAwwNS0lTQSBSb290Q0EgNIICEBwwHQYDVR0OBBYEFHLsBwarzA1yPbO8MVZQIHrjqPenMA4GA1UdDwEB/wQEAwIGwDCBjAYDVR0gAQH/BIGBMH8wfQYJKoMajJpFAQEEMHAwQAYIKwYBBQUHAgIwNB4yx3QAIMd4yZ3BHLKUACCuCMc1rLDIHMbQxdDBHAAgvByuCdVcACDHeMmdwRzHhbLIsuQwLAYIKwYBBQUHAgEWIGh0dHA6Ly93d3cueWVzc2lnbi5vci5rci9jcHMuaHRtMGgGA1UdEQRhMF+gXQYJKoMajJpECgEBoFAwTgwJ7J2064Ko7Je9MEEwPwYKKoMajJpECgEBATAxMAsGCWCGSAFlAwQCAaAiBCAKX6PtUPoJ8uPTbhYf4IV0kpwlJyFjdUMJpIUaGRFFVDByBgNVHR8EazBpMGegZaBjhmFsZGFwOi8vZHMueWVzc2lnbi5vci5rcjozODkvb3U9ZHA1cDg2NjE4LG91PUFjY3JlZGl0ZWRDQSxvPXllc3NpZ24sYz1rcj9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0MDgGCCsGAQUFBwEBBCwwKjAoBggrBgEFBQcwAYYcaHR0cDovL29jc3AueWVzc2lnbi5vcmc6NDYxMjANBgkqhkiG9w0BAQsFAAOCAQEAOp2X4HsoJoi1c6e3gpPdQpLN9Tk0kIDSaRD3WKd9gm5tUp1N/N1hVr460aOMs1nMy71ovkBy0ftu/ujjtANJYFncLOni62OaVBlFJjkYxJxpbyd1iNKkazXvq7BlSerGlNdE8je0r+anrfxS1Su+nzQ03UpYG47Wtu2Dtcknzx/lKgXoaFyyaK3QZXj001nMzas9mlmO0KfyqFLMd/NUxN640II8AVdz+ja3SyX+7HJs00jCGwazHLnPXSZNGsQz1omjTctyAVnG8ILhsuHh8k/S9yz4RxLp9PdhU7AE+r76Ph/kXC6p0TI8PVDs4e9Yje3GuhDfjRImcjATi/HpOw==",
    signPri:
      "MIIFEDAaBggqgxqMmkQBDzAOBAhtQg/jvBTeagICCAAEggTwbuDiEiLH5YO+w9BrfgRC3czcPIO5h9hnRK5Tg7s/Vyx48to2x+29KKv3XDZdQ9s5MCLjIq4tNXX9ycmV+6bepf8Jug9ISHlt63tuaswxSNsn8kh5IKmRVMfDjuC6tkveej7MzjFD0TGWkEXZzV4R4KbQQck9uL2aOVah9GzHCUMO4joNaYSFnWv48Q++qbdE6iKctM5XmFnPRlmhbda6ory2zBxHXhJc2VlsaF6NUJdDuuDHtkx9wUXg18+GUsMolugFB3YlC1IiGggbgrpOozGJY/kQ5C/MpmJgehUvU37y1xJQHN4vETJXNSyLWX3VtHMJxGLc6GgTqOl0yhX/ChkQbVU+y4rVXjp8kV4n7tyas700+8VCrSfc/xj0ron5fX1i5raGBRgkVWoSIqfmz1Ez/Uz6cA6rqqD802fRM3/rm4P/WEleJop8yUefOIC5yWin0HgwdXmHrNny/pa7SCa6S+DmvpDX55PS/LQORgm0c/7y+2/0HY04xHGwRUtDL+CgXlQJcVGeS3mtKg1t3QnAIy4NG2HdM7xggD9CzR159JAyAjPLX/rv9qcMSxSIQxxXMLMdbJ7VKaAeXWfbaknwrlY6rTPruBvBICB9JYxHAkqr0F/37usRxxxuWreA+bzwNK/pR0c7mNm6HYa0jRBJ0/nDfQV+TX/NwveEICt/hUv8rCXkmzr4RUTJB3O3CNSQsfPKAj4eRvJmFtaT3pMEjX7NKs33bxdlXUr030xQOl3OMvxoSxdVW2/wNezKkIj0DrLRul5C3TwaRHmW1csiKgc5d0e2+Mg2ORdNOKicTV5je51TH97NcEJ0JMJpgIW+LBR/IQNzPOu4mIfyslwr/6gckqb/fqsVBZC82P/XApmFCQPUfc+ONsdPAPZy566NyXoQt5FUZaN4csgtCaLPynt/TNTJh8T+NIquNN9ZGHSlK10vjnu55/dBvWxlKzULjHIvpkfCCn2Lsp36r19LWQumTPeIa+jtu3XrmfCStZ0aqOH0iIxjWoT4mMUb7mRsALBAsGPOfZBx99e618JBexnU77KmPHbsMJmEyzGTtxc6sF5RmTVmG4KplYHQidL+gUyGHSeE/126EwaGu569ULnKo7y7i1gLHCi/rkfpEYHrKvlkta+5QJHxPG/pS6Ty70ngYDvvDCk8Hp4UC7VGV9n2kfzBUi7DT5KyvsZV+w7CpIHbNtm6+lG3oRytr0x1/r9pzVJZdEgoxOtucmJaBb9mSgyeqzf2h2dsyWMAuiYPMsK2gIAeyFvSFeXhhL68/p5eZGIN3Dg9mcn+MFsqfbiozxL5PWrFLYk96CCdjIXX/UUko2ZBqjvPw1kCL0Tmx960xTQNmD/Pg0QpGkYTMbZxAi8RmNrm8Gi1pnBsgbcWk/M0vzCUwRYACMdivF3WXjfdbD4r9Tvj0H5x32YgfDXnFCd/2xkpKxuJNH1AdrqtLgPhrl/4MkJ9bTk1jTdAw7BNgXg9gJ0b3fkJRwyd+r06B/Ba/PKZyxNsTqViqTguIRizg84a2JAmeaenlvpzFJj3hD4cpfyXtAPuTX5qld4vS67kkuoQgbJ//Yud7pjnr0zownB2OAnVQHMTU8wqFeHhhle3yST1rEOud4BxTin2m52DoakKvdJmOIfVspR0dWMWFpismVbAEnng9WtqLjwPZJrNWtnZ7UD6/Q==",
    signPw: "skaduq6720!",
    signB64Pw: "c2thZHVxNjcyMCE=",
    agentId: "",
    agentPw: "",
    nMemberLoginYn: "",
    bizNo: "9008271820812",
    bizB64No: "OTAwODI3MTgyMDgxMg==",
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
}).then((res) => {
  const response = res;
  console.log(response);
  console.log(headers);
});

// axios({
//   url: "https://stg.benefitplus.kr/api/loan_recpetion",
//   method: "get",
//   data: {
//     name: "체납내역",
//   },
// }).then((response) => {
//   console.log(JSON.parse(response.data.data.data[0].output));
// });
