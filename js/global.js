document.addEventListener("DOMContentLoaded", () => {
  renderCartCounter();
});

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

exports = {
  renderCartCounter,
  getCart,
  currencyFormat,
  getUserData,
};
