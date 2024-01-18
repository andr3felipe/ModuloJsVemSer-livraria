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

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

exports = {
  renderCartCounter,
};
