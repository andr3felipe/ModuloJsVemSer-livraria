let books = [];

const imageInput = document.getElementById('bookImage');
const titleInput = document.getElementById('bookTitle');
const authorInput = document.getElementById('bookAuthor');
const genreInput = document.getElementById('bookGenre');
const priceInput = document.getElementById('bookPrice');
const descriptionInput = document.getElementById('bookDescription');
const modal = new bootstrap.Modal(document.getElementById('addBookModal'));
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll(".sidebarItem");
    const sections = document.querySelectorAll('section');

    sidebarItems.forEach((item) => {
        item.addEventListener('click', () => {
        sidebarItems.forEach((item) => {
            item.classList.remove("active-item");
        });

        item.classList.add('active-item');

        sections.forEach((section) => {
            if (item.id === section.id) {
                section.style.display = 'flex';
            } else {
                section.style.display = 'none';
            }
        });
    });

    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => {
            books = data;
            renderBooks();
        })
        .catch(err => console.error('Erro ao obter os dados do servidor: ', err));

    const saveEditBtn = document.getElementById('saveEditBtn');
    saveEditBtn.addEventListener('click', editBook);
});
});

function addBook() {
    const image = imageInput.value.trim();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const genre = genreInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    const description = descriptionInput.value.trim();

    if (!image || !title || !author || !genre || isNaN(price) || price <= 0 || !description) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const newBook = {
        image: image,
        title: title,
        author: author,
        genre: genre,
        price: price,
        description: description,
    };

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    })
    .then(response => response.json())
    .then(data => {
        books.push(data);
        alert('Livro adicionado com sucesso');
        renderBooks();
    })
    .catch(err => console.error('Erro ao adicionar livro: ', err));
}

function currencyFormat(value) {
    return 'R$ ' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function currencyFormat(number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number / 100);
}

function renderBooks() {
    document.querySelector('.cards').innerHTML = '';

    books.forEach(book => {
        document.querySelector('.cards').innerHTML += renderBook(book);
    })

    modal.hide();
}

function renderBook(book) {
    const title =
      book.title.length > 30 ? book.title.substring(0, 30) + "..." : book.title;
  
    const discount =
      book.discountPercent > 0 ? (book.price / 100) * book.discountPercent : 0;
  
    return `<div class="custom-card" data-id="${book.id}">
                <div class="custom-card-head">
                <div class="custom-card-image">
                    <img src="${book.image}" alt="" />
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
                    <div class="manage-buttons">
                        <button type="button" onclick="fillEditForm('${book.id}')" class="edit-btn" data-bs-toggle="modal" data-bs-target="#editBookModal">
                            <img class="manage-img" id="editPencilBtn" src="../assets/pencil.png" alt="icone de editar">
                        </button>
                        <button onclick="deleteBook('${book.id}')">
                            <img class="manage-img" id="removeBtn" src="../assets/trash.png" alt="icone de remover"></button>
                        </button>
                    </div>
                </div>
             </div>`;
  }

const editBookImageInput = document.getElementById('editBookImage');
const editBookTitleInput = document.getElementById('editBookTitle');
const editBookAuthorInput = document.getElementById('editBookAuthor');
const editBookGenreInput = document.getElementById('editBookGenre');
const editBookPriceInput = document.getElementById('editBookPrice');
const editBookDescriptionInput = document.getElementById('editBookDescription');
const editBookForm = document.getElementById('editBookForm');
const editModal = new bootstrap.Modal(document.getElementById('editBookModal'));

function fillEditForm(id) {
    const bookToEdit = books.find(book => book.id === `${id}`);

    editBookImageInput.value = bookToEdit.image;
    editBookTitleInput.value = bookToEdit.title;
    editBookAuthorInput.value = bookToEdit.author;
    editBookGenreInput.option = bookToEdit.genre;
    editBookPriceInput.value = bookToEdit.price;
    editBookDescriptionInput.textContent = bookToEdit.description;

    document.getElementById('saveEditBtn').addEventListener('click', () => editBook(id));
}

function editBook(id) {  
    const editedImage = editBookImageInput.value;
    const editedTitle = editBookTitleInput.value;
    const editedAuthor = editBookAuthorInput.value;
    const editedGenre = editBookGenreInput.value;
    const editedPrice = parseFloat(editBookPriceInput.value);
    const editedDescription = editBookDescriptionInput.value;

    if (!editedImage || !editedTitle || !editedAuthor || !editedGenre || isNaN(editedPrice) || editedPrice <= 0 || !editedDescription) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const editedBook = {
        image: editedImage,
        title: editedTitle,
        author: editedAuthor,
        genre: editedGenre,
        price: editedPrice,
        description: editedDescription,
    };

    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBook),
    })
    .then(response => response.json())
    .then(data => {
        const index = books.findIndex(book => book.id == id);
        books[index] = data;
        renderBooks();
        alert('Livro editado com sucesso');
    })
    .catch(err => console.error('Erro ao editar livro: ', err));

    editModal.hide();
}

function deleteBook(id) {
    console.log(books)
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        books = books.filter(book => book.id != id);
        renderBooks();
        alert('Livro removido com sucesso');
    })
    .catch(err => console.error('Erro ao excluir livro: ', err));
}



