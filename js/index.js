document.addEventListener("DOMContentLoaded", async () => {
  renderBooks();

  if (verifyLogin()) {
    removeLoginButton();
  }
});

async function getBooks() {
  const response = await fetch("http://localhost:3000/books");
  const books = await response.json();
  return books;
}

function removeLoginButton() {
  document.getElementById("login-button").remove();
  document.getElementById("login-button-desktop").remove();
}

function randomGenerator(length) {
  return Math.floor(Math.random() * length);
}

function goToLogin() {
  window.location.href = "../pages/login.html";
}

function addToCart(bookId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const book = books.find((book) => book.id == bookId);

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

let books = [];
async function renderBooks() {
  books = await getBooks();
  const copyBooks = [...books];

  const user = JSON.parse(localStorage.getItem("user")) || null;

  const bestSellers = document.getElementById("best-sellers");
  const youMightBeInterested = document.getElementById(
    "you-might-be-interested"
  );
  const recentlySeen = document.getElementById("recently-seen");

  let bestSellersBooks = "";

  for (let i = 0; i < 5; i++) {
    const book = copyBooks[i];

    if (user) {
      if (user?.favorites.find((favorite) => favorite.id == book.id)) {
        bestSellersBooks += renderBook(book, (favorite = true));
      } else {
        bestSellersBooks += renderBook(book, (favorite = false));
      }
    } else {
      bestSellersBooks += renderBook(book);
    }
  }

  let youMightBeInterestedBooks = "";

  for (let i = 5; i < 10; i++) {
    const book = copyBooks[i];

    if (user) {
      if (user?.favorites.find((favorite) => favorite.id == book.id)) {
        youMightBeInterestedBooks += renderBook(book, (favorite = true));
      } else {
        youMightBeInterestedBooks += renderBook(book, (favorite = false));
      }
    } else {
      youMightBeInterestedBooks += renderBook(book);
    }
  }

  let recentlySeenBooks = "";

  for (let i = 10; i < 15; i++) {
    const book = copyBooks[i];

    if (user) {
      if (user?.favorites.find((favorite) => favorite.id == book.id)) {
        recentlySeenBooks += renderBook(book, (favorite = true));
      } else {
        recentlySeenBooks += renderBook(book, (favorite = false));
      }
    } else {
      recentlySeenBooks += renderBook(book);
    }
  }

  bestSellers.innerHTML = bestSellersBooks;
  youMightBeInterested.innerHTML = youMightBeInterestedBooks;
  recentlySeen.innerHTML = recentlySeenBooks;
}

function updateUserData(bookId, action) {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && action === "add") {
    user.favorites.push(books.find((book) => book.id == bookId));
  }

  if (user && action === "remove") {
    user.favorites = user.favorites.filter((favorite) => favorite.id != bookId);
  }

  localStorage.setItem("user", JSON.stringify(user));
  renderBooks();
}

function renderBook(book, favorite) {
  const title =
    book.title.length > 30 ? book.title.substring(0, 30) + "..." : book.title;

  const discount =
    book.discountPercent > 0 ? (book.price / 100) * book.discountPercent : 0;

  return `<div class="custom-card">
    <div class="custom-card-head">
      <div class="custom-card-image">
        <img src="./assets/books/${book.id}.webp" alt="" />
      </div>
    </div>

    <div class="custom-card-body">
      <p class="title">${title}</p>

      <div class="custom-card-price">
        ${
          discount > 0
            ? `<p class="price-off">${currencyFormat(book.price)}</p>`
            : ""
        }
        <p class="price">${currencyFormat(book.price - discount)}</p>
      </div>
    </div>

    <div class="custom-card-footer">
      <button class="add-to-cart" onclick="addToCart(${
        book.id
      })">Comprar</button>
      <div class="favorite-container">
       
        ${
          favorite === undefined
            ? `<i class="ph ph-heart" onclick="goToLogin()"></i>`
            : favorite === true
            ? `<i class="ph-fill ph-heart favorite" onclick="updateUserData(${book.id}, 'remove')"></i>`
            : `<i class="ph ph-heart not-favorite" onclick="updateUserData(${book.id}, 'add')"></i>`
        }
      </div>
    </div>
  </div>`;
}
