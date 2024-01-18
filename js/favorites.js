document.addEventListener("DOMContentLoaded", function () {
  document.body.style.display = "none";

  if (!verifyLogin()) {
    window.location.href = "./login.html";
  } else {
    document.body.style.display = "block";
  }
});

function verifyLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user != null;
}
