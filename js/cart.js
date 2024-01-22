document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  totalCart();
  if (verifyLogin()) {
    fixButtons({ home: false, inPainelPage: false });
    document.getElementById("login-button-desktop")?.remove();
    document.getElementById("login-button-mobile")?.remove();
  } else {
    document.getElementById("profile-button-desktop").remove();
  }
});

function order() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "./login.html";
    alert("Você precisa estar logado para realizar um pedido.");
    return;
  }

  document.getElementById("products-container").remove();
  document.getElementById("resume").remove();

  const container = document.getElementById("custom-container");

  container.innerHTML = `
    <div class="order mt-5">
      <h2>Seu pedido foi realizado com sucesso!</h2>
      <p>Em breve você receberá um e-mail com os detalhes do seu pedido.</p>
    </div>
  `;

  localStorage.removeItem("cart");
}

function removeProduct(id) {
  const products = JSON.parse(localStorage.getItem("cart"));
  const productIndex = products.findIndex((product) => product.id == id);

  products.splice(productIndex, 1);

  localStorage.setItem("cart", JSON.stringify(products));
  renderProducts();
  totalCart();
}

function productCount(id, operation) {
  const products = JSON.parse(localStorage.getItem("cart"));
  const productIndex = products.findIndex((product) => product.id == id);

  if (operation === "add") {
    products[productIndex].quantity++;
  } else {
    products[productIndex].quantity > 1 ? products[productIndex].quantity-- : 0;
  }

  localStorage.setItem("cart", JSON.stringify(products));
  renderProducts();
  totalCart();
}

function totalCart() {
  const products = JSON.parse(localStorage.getItem("cart"));

  const subtotal = document.getElementById("subtotal");
  const frete = document.getElementById("frete");
  const total = document.getElementById("total");

  const subtotalCalc = products.reduce((acc, product) => {
    acc +=
      (product.price / 100) *
      (100 - product.discountPercent) *
      product.quantity;
    return acc;
  }, 0);

  const freteCalc = 1500;

  const totalCalc = subtotalCalc + freteCalc;

  subtotal.innerText = currencyFormat(subtotalCalc);
  frete.innerText = currencyFormat(freteCalc);
  total.innerText = currencyFormat(totalCalc);
}

function renderProducts() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const productsContainer = document.getElementById("products-container");

  productsContainer.innerHTML =
    products.length > 0
      ? products.reduce((acc, product) => {
          acc += `
      <div class="product">
        <img src="../assets/books/${product.id}.webp" alt="${product.name}" />
        <div class="product-info">
          <p>${product.title}</p>
          ${
            product.discountPercent > 0
              ? `<p class="price-off">${currencyFormat(product.price)}</p>`
              : ""
          }
          ${`<p class="product-price">${currencyFormat(
            (product.price / 100) * (100 - product.discountPercent)
          )}</p>`}
          <p class="mt-3">Quantidade:</p>
          <div class="buttons">          
          <button onclick="productCount(${product.id})"><</button>
          <input class="form-control" disabled type="text" value="${
            product.quantity
          }" />
          <button onclick="productCount(${product.id}, 'add')">></button>
         
          </div>
          <button class="remove-product" onclick="removeProduct(${
            product.id
          })">Remover</button>
        </div>
      </div>
    `;

          return acc;
        }, "")
      : `<p class="mt-3">Nenhum produto no carrinho.</p>`;

  if (products.length === 0) {
    document.getElementById("resume").style.display = "none";
  } else {
    document.getElementById("resume").style.display = "block";
  }
}
