document.addEventListener("DOMContentLoaded", async () => {
  renderBooks();
});

async function getBooks() {
  const response = await fetch("http://localhost:3000/books");
  const books = await response.json();
  return books;
}

function randomGenerator(length) {
  return Math.floor(Math.random() * length);
}

function currencyFormat(number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number / 100);
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

function renderBook(book) {
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
        <i class="ph ph-heart not-favorite"></i>
        <i class="ph-fill ph-heart favorite"></i>
      </div>
    </div>
  </div>`;
}

let books = [];
async function renderBooks() {
  books = await getBooks();
  const copyBooks = [...books];

  const bestSellers = document.getElementById("best-sellers");
  const youMightBeInterested = document.getElementById(
    "you-might-be-interested"
  );
  const recentlySeen = document.getElementById("recently-seen");

  let bestSellersBooks = "";

  for (let i = 0; i < 5; i++) {
    const book = copyBooks.splice(randomGenerator(copyBooks.length), 1)[0];
    bestSellersBooks += renderBook(book);
  }

  let youMightBeInterestedBooks = "";

  for (let i = 0; i < 5; i++) {
    const book = copyBooks.splice(randomGenerator(copyBooks.length), 1)[0];
    youMightBeInterestedBooks += renderBook(book);
  }

  let recentlySeenBooks = "";

  for (let i = 0; i < 5; i++) {
    const book = copyBooks.splice(randomGenerator(copyBooks.length), 1)[0];
    recentlySeenBooks += renderBook(book);
  }

  bestSellers.innerHTML = bestSellersBooks;
  youMightBeInterested.innerHTML = youMightBeInterestedBooks;
  recentlySeen.innerHTML = recentlySeenBooks;
}
