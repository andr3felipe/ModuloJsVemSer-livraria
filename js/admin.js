let books = [];

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
    const book = {
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg',
        title: titleInput.value,
        author: authorInput.value,
        genre: genreInput.value,
        price: priceInput.value,
        description: descriptionInput.value
    };

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
        .then(response => response.json())
        .then(data => {
            books.push(data);
            renderBooks();
            modal.hide();
        })
        .catch(error => console.error('Erro ao adicionar livro:', error));
    
    titleInput.value = '';
    authorInput.value = '';
    genreInput.value = '';
    priceInput.value = '';
    descriptionInput.value = '';
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
        const title =
            book.title.length > 30 ? book.title.substring(0, 30) + "..." : book.title;

        const discount =
            book.discountPercent > 0 ? (book.price / 100) * book.discountPercent : 0;

        document.querySelector('.cards').innerHTML += `
        <div class="custom-card">
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
            <div class="manage-buttons">
                <button type="button" class="edit-btn" data-bs-toggle="modal" data-bs-target="#editBookModal">
                    <img class="manage-img" src="../assets/pencil.png" alt="icone de editar">
                </button>
                <button>
                    <img class="manage-img" id="removeBtn" src="../assets/trash.png" alt="icone de remover"></button>
                </button>
            </div>
        </div>
      </div>
        `;
    })

modal.hide();
}


function editBook() {
    const bookToUpdate = books.find(book => book.title === document.getElementById('editBookTitle').value);

    console.log(bookToUpdate)

    if (!bookToUpdate) {
        console.error('Livro não encontrado.');
        return;
    }

    bookToUpdate.title = document.getElementById('editBookTitle').value;
    bookToUpdate.author = document.getElementById('editBookAuthor').value;
    bookToUpdate.genre = document.getElementById('editBookGenre').value;
    bookToUpdate.price = document.getElementById('editBookPrice').value;
    bookToUpdate.description = document.getElementById('editBookDescription').value;

    fetch(`http://localhost:3000/books/${bookToUpdate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookToUpdate),
    })
        .then(response => response.json())
        .then(data => {
            const index = books.findIndex(book => book.id === data.id);
            
            books[index] = data;

            renderBooks();
            const editModal = new bootstrap.Modal(document.getElementById('editBookModal'));
            editModal.hide();
        })
        .catch(error => console.error('Erro ao editar livro:', error));
}






