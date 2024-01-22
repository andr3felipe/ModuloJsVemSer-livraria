document.addEventListener("DOMContentLoaded", function () {
  document.body.style.display = "none";

  if (!verifyLogin()) {
    window.location.href = "./login.html";
  } else {
    document.body.style.display = "block";
    renderFavorities();
    fixButtons({ inPainelPage: false, home: false });
  }
});

function verifyLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user != null;
}

function renderFavorities() {
  let items = "";
  let user = JSON.parse(localStorage.getItem("user"));

  if (user.favorites.length === 0) {
    return (document.getElementById(
      "custom-cards-container"
    ).innerHTML = `<div class="empty-favorities"><p>Você ainda não tem favoritos.</p></div>`);
  }

  for (let book of user.favorites) {
    items += renderBook(book);
  }

  document.getElementById("custom-cards-container").innerHTML = items;
}

async function updateUserData(bookId, action) {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && action === "add") {
    user.favorites.push(books.find((book) => book.id == bookId));
  }

  if (user && action === "remove") {
    user.favorites = user.favorites.filter((favorite) => favorite.id != bookId);
  }

  localStorage.setItem("user", JSON.stringify(user));
  renderFavorities();
}

function renderBook(book) {
  const title =
    book.title.length > 30 ? book.title.substring(0, 30) + "..." : book.title;

  const discount =
    book.discountPercent > 0 ? (book.price / 100) * book.discountPercent : 0;

  return `<div class="custom-card">
    <div class="custom-card-head">
      <div class="custom-card-image">
        <img src="../assets/books/${book.id}.webp" alt="" />
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
          <i class="ph-fill ph-heart favorite" onclick="updateUserData(${
            book.id
          }, 'remove')"></i>       
      </div>
    </div>
  </div>`;
}
