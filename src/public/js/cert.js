import $ from "jquery";
import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage(
  process.env.SESSION_STORAGE_KEY,
  {
    prefix: "@bplus",
    storageType: "sessionStorage",
  }
);

let selectedCert = new Object();

$.support.cors = true;
$(window).resize(function () {
  $("#inputDiv").css("height", (650 / 875) * $(window).height() * 0.93);
  $("#inputDiv2").css("height", (650 / 875) * $(window).height() * 0.93);
  $("#outputView").css("height", (650 / 875) * $(window).height() * 0.93);
  $("#outputDiv").css("height", (650 / 875) * $(window).height() * 0.93);
});

$(function () {
  $("#tx_input").val(
    '{"appCd": "InfotechApiDemo", "orgCd": "hometax", "svcCd": "Z0001", "bizNo": "1388148652"}'
  );

  $("#signPw").keydown(function (key) {
    if (key.keyCode == 13) {
      selectedCertExecution();
    }
  });
});

function selectedCertExecution() {
  selectedCert.signPw = $("#signPw").val();
  encryptStorage.setItem("signPw", $("#signPw").val());
  encryptStorage.setItem("signB64Pw", btoa($("#signPw").val()));

  if (selectedCert.signCert === undefined || selectedCert.signCert === null) {
    alert("인증서를 선택해주세요");
  } else if (
    selectedCert.signPw === undefined ||
    selectedCert.signPw === null ||
    selectedCert.signPw === ""
  ) {
    alert("인증서 비밀번호를 입력해주세요");
  } else {
    loadDoc("execute", JSON.stringify(selectedCert), 16566);
    document.getElementById("confirmModal").classList.remove("hidden");
    document.getElementById("confirmModal").classList.add("flex");
    selectedCertReset();
  }
}

function selectedCertReset() {
  $("#tbody").empty();
  $("#signPw").val("");
  $(".dim-layer").fadeOut("fast");
  selectedCert = new Object();
}

function loadDoc(s_op, s_inJson, port, success) {
  const url = "https://127.0.0.1:" + port + "/?op=" + s_op;

  $.ajax({
    type: "POST",
    url: url,
    data: s_inJson || "{}",
    crossDomain: true,
    crossOrigin: true,
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: function (data) {
      printReceive(data);
      if (null != success) success(data);
    },
    error: function (xhr, status, error) {
      $("#tx_output").val("status : " + status + "\nerror : " + error);
      if ("setup" == s_op) {
        alert("프로그램 설치가 필요합니다.");
      } else {
        // 에러 처리 로직
      }
    },
  });
}

function popup() {
  layerPopup("#layer");

  let success = function (data) {
    data.list.forEach(function (item) {
      let tr = document.createElement("tr");
      tr.setAttribute("class", "certList");
      tr.addEventListener("click", selectNode);
      //구분
      let td = document.createElement("td");
      td.setAttribute("style", "width:auto");
      td.innerText = distingCert(item.oid);
      tr.appendChild(td);

      //인증서명
      td = document.createElement("td");
      td.setAttribute(
        "style",
        "width:230px;text-overflow:ellipsis;font-size: 80%"
      );
      td.innerText = item.certName;
      tr.appendChild(td);

      // 만료일
      td = document.createElement("td");
      td.setAttribute("style", "width:100px;font-size: 80%");
      td.innerText = item.toDt;
      tr.appendChild(td);

      //발급자
      td = document.createElement("td");
      td.setAttribute("style", "width:100px;");
      td.innerText = item.pub;
      tr.appendChild(td);

      //위치
      td = document.createElement("td");
      td.setAttribute("style", "width:40px;");
      td.innerText = item.drive;
      tr.appendChild(td);

      //Path (숨김처리)
      td = document.createElement("td");
      td.setAttribute("style", "display:none");
      td.innerText = item.path;
      tr.appendChild(td);

      document.getElementById("tbody").appendChild(tr);
    });

    $("#tbody td").css("border", "1px solid rgba(128, 128, 128, 0.2)");
  };
  loadDoc("certList", setCertSelect(), 16566, success);
}

function layerPopup(el) {
  var $el = $(el);
  $(".dim-layer").fadeIn("fast");

  let $elWidth = ~~$el.outerWidth();
  let $elHeight = ~~$el.outerHeight();
  let docWidth = $(document).width();
  let docHeight = $(document).height();

  if ($elHeight < docHeight || $elWidth < docWidth) {
    $el.css({
      marginTop: -$elHeight / 2,
      marginLeft: -$elWidth / 2,
    });
  } else {
    $el.css({ top: 0, left: 0 });
  }
}

function printReceive(data) {
  try {
    const jsonPretty = JSON.stringify(
      JSON.parse(JSON.stringify(data)),
      null,
      2
    );
    $("#tx_output").val(jsonPretty);
    const jsonData = JSON.parse(jsonPretty);
    if (jsonData.errYn === "N") {
      if (jsonData.DER2PEM !== undefined) {
        // sessionStorage.setItem(
        //   "signCert",
        //   jsonData.DER2PEM.split("-----")[2].replace(/\n/gi, "")
        // );
        encryptStorage.setItem(
          "signCert",
          jsonData.DER2PEM.split("-----")[2].replace(/\n/gi, "")
        );
        // sessionStorage.setItem(
        //   "signKey",
        //   jsonData.KEY2PEM.split("-----")[2].replace(/\n/gi, "")
        // );
        encryptStorage.setItem(
          "signKey",
          jsonData.KEY2PEM.split("-----")[2].replace(/\n/gi, "")
        );
      }
    } else {
      alert(jsonData.errMsg);
    }
  } catch (e) {
    $("#tx_output").val(data);
  }
}

function selectNode(el) {
  $("#tbody tr").css("background-color", "white");
  $("#tbody tr").addClass("active-color");

  const path = el.path[1].children[5].innerText;
  selectedCert.orgCd = "common";
  selectedCert.svcCd = "getCertInfo";
  selectedCert.appCd = "InfotechApiDemo";
  selectedCert.signCert = path + "\\signCert.der";
  selectedCert.signPri = path + "\\signPri.key";
}

function setCertSelect() {
  // sample
  // $('#tx_input').val('{"certImageUrl": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png", "nxKeypad": ""}');
  $("#tx_input").val('{"certImageUrl": "", "nxKeypad": ""}');
  return $("#tx_input").val();
}

function distingCert(oid) {
  let divNm = "기타";
  let perArr = [
    "1.2.410.200005.1.1.1",
    "1.2.410.200004.5.1.1.5",
    "1.2.410.200004.5.2.1.2",
    "1.2.410.200004.5.4.1.1",
    "1.2.410.200012.1.1.1",
    "1.2.410.200005.1.1.4",
    "1.2.410.200012.1.1.101",
    "1.2.410.200004.5.2.1.7.1",
    "1.2.410.200004.5.4.1.101",
    "1.2.410.200004.5.1.1.9.2",
    "1.2.410.200004.5.2.1.7.3",
    "1.2.410.200004.5.4.1.103",
    "1.2.410.200012.1.1.105",
    "1.2.410.200012.1.1.103",
    "1.2.410.200004.5.1.1.9",
    "1.2.410.200004.5.2.1.7.1",
    "1.2.410.200004.5.4.1.101",
    "1.2.410.200012.1.1.101",
    "1.2.410.200004.5.1.1.9",
    "1.2.410.200004.5.2.1.7.2",
    "1.2.410.200004.5.4.1.102",
    "1.2.410.200012.1.1.103",
    "1.2.410.200004.5.4.1.104",
    "1.2.410.200004.5.5.1.3.1",
    "1.2.410.200004.5.5.1.4.1",
    "1.2.410.200004.5.5.1.4.2",
  ];
  let bizArr = [
    "1.2.410.200005.1.1.5",
    "1.2.410.200004.5.1.1.7",
    "1.2.410.200004.5.2.1.1",
    "1.2.410.200004.5.4.1.2",
    "1.2.410.200012.1.1.3",
    "1.2.410.200005.1.1.2",
    "1.2.410.200005.1.1.6.1",
    "1.2.410.200004.5.1.1.12.908",
    "1.2.410.200004.5.2.1.5001",
    "1.2.410.200004.5.2.1.6.257",
    "1.2.410.200005.1.1.6.8",
    "1.2.410.200005.1.1.6.3",
    "1.2.410.200005.1.1.6.5",
    "1.2.410.200005.1.1.6.4",
    "1.2.410.200005.1.1.7.1",
    "1.2.410.200004.5.5.1.2",
  ];

  if ($.inArray(oid, perArr) != -1) {
    divNm = "개인";
  } else if ($.inArray(oid, bizArr) != -1) {
    divNm = "법인";
  }
  return divNm;
}

const downloadModule = () => {
  document.getElementById("downloadCertModule").click();
};

window.onload = downloadModule;

document.getElementById("cert").addEventListener("click", popup);
document
  .getElementById("certCancel")
  .addEventListener("click", selectedCertReset);
document
  .getElementById("certConfirm")
  .addEventListener("click", selectedCertExecution);

(function () {
  var w = window;
  if (w.ChannelIO) {
    return (window.console.error || window.console.log || function () {})(
      "ChannelIO script included twice."
    );
  }
  var ch = function () {
    ch.c(arguments);
  };
  ch.q = [];
  ch.c = function (args) {
    ch.q.push(args);
  };
  w.ChannelIO = ch;
  function l() {
    if (w.ChannelIOInitialized) {
      return;
    }
    w.ChannelIOInitialized = true;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
    s.charset = "UTF-8";
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  }
  if (document.readyState === "complete") {
    l();
  } else if (window.attachEvent) {
    window.attachEvent("onload", l);
  } else {
    window.addEventListener("DOMContentLoaded", l, false);
    window.addEventListener("load", l, false);
  }
})();

ChannelIO("boot", {
  pluginKey: "bb9bd3c1-690e-4c0e-bade-22b07ad5e642",
});
