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

function renderBooks() {
    document.querySelector('.cards').innerHTML = '';

    books.forEach(book => {
        document.querySelector('.cards').innerHTML += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top book-img" src="${book.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.description}</p>
                    <div class="manage-buttons">
                        <button type="button" class="edit-btn" data-bs-toggle="modal" data-bs-target="#editBookModal">
                            <img class="manage-img" onclick="editBook('${book.title}')" src="../assets/pencil.png" alt="">
                        </button>
                        <button>
                            <img class="manage-img" id="removeBtn" src="../assets/trash.png" alt=""></button>
                        </button>
                    </div>
                </div>
            </div>
        `;
    })

    modal.hide();
}

function deleteBook() {
    
}





