document.addEventListener("DOMContentLoaded", () => {
  renderCartCounter();
});

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../pages/login.html";
}

async function updateUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

function renderCartCounter() {
  const cartItems = getCart().length;
  if (cartItems > 0) {
    document.getElementById(
      "cart-icon"
    ).innerHTML = `<span id="cart-count">${cartItems}</span>`;
  }
}

async function getUserData() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  let response = await fetch(`http://localhost:3000/users/${loggedUser.id}`);

  return (user = await response.json());
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function currencyFormat(number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number / 100);
}

function verifyLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user != null;
}

function fixButtons() {
  document.getElementById("login-button")?.remove();
  document.getElementById("login-button-desktop")?.remove();

  document.getElementById("desktop-navbar").innerHTML += `
  <a
  href="../pages/login.html"
  onclick="logout()"  
  class="btn d-flex align-items-center justify-content-center gap-1 custom-navbar-icon"
>
  <i class="ph ph-sign-out fs-4"></i>
  Sair
</a>`;
}

exports = {
  renderCartCounter,
  getCart,
  currencyFormat,
  getUserData,
  verifyLogin,
  fixButtons,
  logout,
  updateUser,
};
