document.addEventListener("DOMContentLoaded", function () {
  document.body.style.display = "none";

  if (verifyLogin()) {
    window.location.href = "./pages/profile.html";
  } else {
    document.body.style.display = "block";
  }
});

async function login(event) {
  event.preventDefault();

  let email = event.target.email.value;
  let password = event.target.password.value;

  let response = await fetch("http://localhost:3000/users");

  let users = await response.json();

  if (users) {
    const user = users.find((user) => user.email === email);

    if (user?.password === password) {
      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = "../pages/favorites.html";
    } else {
      event.target.password.value = "";
      document.getElementById("error").innerHTML = "Credenciais inválidas";
    }
  }
}
