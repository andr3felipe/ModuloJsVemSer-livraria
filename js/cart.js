document.addEventListener("DOMContentLoaded", function () {
  if (verifyLogin()) {
    fixButtons({ home: false, inPainelPage: false });
    document.getElementById("login-button-desktop").remove();
    document.getElementById("login-button-mobile").remove();
  } else {
    document.getElementById("profile-button-desktop").remove();
  }
});
