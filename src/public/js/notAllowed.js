import logo from "../images/BPLUS_main_logo.png";

// 메인 화면 로고 설정
document.getElementById("mainLogo").src = logo;

window.history.pushState(null, null, window.location.href);
window.onpopstate = () => {
  window.history.go(1);
};
