import logo from "../images/BPLUS_main_logo.png";
import KCDlogo from "../images/cn_logo_gradient (2).png";

// 메인 화면 로고 설정
document.getElementById("mainLogo").src = logo;
document.getElementById("KCDLogo").src = KCDlogo;

sessionStorage.setItem("type", "cashnote");

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
