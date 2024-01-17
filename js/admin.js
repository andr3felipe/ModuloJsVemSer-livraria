let books = [
    { 
        id: 1,
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
        title: 'Dom Casmurro', 
        author: 'Machado de Assis', 
        genre: 'Romance', 
        price: '30.50', 
        description: 'Clássico da literatura brasileira.' 
    },
    { 
        id: 2,
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
        title: '1984', 
        author: 'George Orwell', 
        genre: 'Ficção Científica', 
        price: '25.99', 
        description: 'Distopia que aborda questões políticas e sociais.' 
    },
    { 
        id: 3,
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
        title: 'O Senhor dos Anéis', 
        author: 'J.R.R. Tolkien', 
        genre: 'Fantasia', 
        price: '40.75', 
        description: 'Trilogia épica de fantasia.' 
    },
    { 
        id: 4,
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
        title: 'Harry Potter e a Pedra Filosofal', 
        author: 'J.K. Rowling', 
        genre: 'Fantasia', 
        price: '22.90', 
        description: 'Início da saga do jovem bruxo.' 
    },
    { 
        id: 5,
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
        title: 'Crime e Castigo', 
        author: 'Fiódor Dostoiévski', 
        genre: 'Romance', 
        price: '28.30', 
        description: 'Exploração psicológica de um crime.' 
    },
    { 
        id: 6,
        image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
        title: 'Orgulho e Preconceito', 
        author: 'Jane Austen', 
        genre: 'Romance', 
        price: '18.99', 
        description: 'Romance clássico sobre amor e preconceito social.' 
    }
];

fetch('http://localhost:3000/books').then(data => console.log(data.json()))

document.addEventListener('DOMContentLoaded', () => {
    renderBooks();

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
    });
});

const titleInput = document.getElementById('bookTitle');
const authorInput = document.getElementById('bookAuthor');
const genreInput = document.getElementById('bookGenre');
const priceInput = document.getElementById('bookPrice');
const descriptionInput = document.getElementById('bookDescription');
const modal = new bootstrap.Modal(document.getElementById('addBookModal'));

function addBook() {
    books.push(
        {
            id: books.length + 1,
            image: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._AC_UF1000,1000_QL80_.jpg', 
            title: titleInput.value, 
            author: authorInput.value, 
            genre: genreInput.value, 
            price: priceInput.value, 
            description: descriptionInput.value
        }
    )
    renderBooks();
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
                        <button type="button" data-bs-toggle="modal" data-bs-target="#addBookModal">
                        <img class="manage-img" src="../assets/pencil.png" alt="">
                        </button>
                        <button>
                        <img class="manage-img" src="../assets/trash.png" alt=""></button>
                        </button>
                    </div>
                </div>
            </div>
        `;
    })

    modal.hide();
}

function editBook() {

}

function deleteBook() {

}





