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
  const cart = document.getElementById("cart-icon");
  if (cart && cartItems > 0) {
    cart.innerHTML = `<span id="cart-count">${cartItems}</span>`;
  }
}

async function addToCart(bookId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const booksData = await getBooks();
  const book = booksData.find((book) => book.id == bookId);

  if (cart.find((book) => book.id == bookId)) {
    cart.map((book) => {
      if (book.id == bookId) {
        book.quantity += 1;
      }

      return book;
    });
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify([...cart]));

  renderCartCounter();
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

function fixButtons({ inPainelPage = false, home = false }) {
  document.getElementById("login-button")?.remove();
  document.getElementById("login-button-desktop")?.remove();

  const painelHref = home ? "./pages/admin.html" : "./admin.html";

  document.getElementById("desktop-navbar").innerHTML += `
  <a
  href="../pages/login.html"
  onclick="logout()"  
  class="btn d-flex align-items-center justify-content-center gap-1 custom-navbar-icon"
>
  <i class="ph ph-sign-out fs-4"></i>
  Sair
</a>`;

  const renderMyProfileButtonMobile = inPainelPage
    ? ""
    : `<li class="nav-item text-center custom-nav-item-mobile">
    <a class="nav-link" href=${painelHref}>Meu perfil</a>
    </li>`;

  document.getElementById("mobile-navbar").innerHTML += `
${renderMyProfileButtonMobile}
  
<li class="nav-item text-center custom-nav-item-mobile">
    <a class="nav-link" href="../pages/login.html" onclick="logout()"
>Sair</a
>
</li>`;
}

async function getBooks() {
  const response = await fetch("http://localhost:3000/books");
  const books = await response.json();
  return books;
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
  addToCart,
  getBooks,
};
