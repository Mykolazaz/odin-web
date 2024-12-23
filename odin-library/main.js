const myLibrary = [
    {
        author: "Haruki Murakami",
        title: "Norwegian Wood",
        numPages: 298,
        isRead: true,
    },
    {
        author: "Astrid Lindgren",
        title: "Karlsson-on-the-Roof",
        numPages: 176,
        isRead: false,
    }
];

function Book(author, title, numPages, isRead) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBookToLibrary(author, title, numPages, isRead) {
    const newBook = new Book(author, title, numPages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p class="book-info">Author: ${book.author}</p>
        <p class="book-info">Pages: ${book.numPages}</p>
        <div class="read-status ${book.isRead ? 'read' : 'unread'}">
            ${book.isRead ? 'Read' : 'Not Read'}
        </div>
        <div class="delete-btn delete" data-index="${index}">Delete</div>
    `;
    
    bookCard.querySelector(".delete-btn").addEventListener("click", () => {
        removeBookFromLibrary(index);
    });
    
    return bookCard;
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const board = document.querySelector(".board");
    board.innerHTML = ''; // Clear existing books
    
    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        board.appendChild(bookCard);
    });
}

// Dialog handling
const dialog = document.querySelector("#bookDialog");
const addBookBtn = document.querySelector("#addBookBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const bookForm = document.querySelector("#bookForm");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    bookForm.reset();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const numPages = parseInt(document.querySelector("#numPages").value);
    const isRead = document.querySelector("#isRead").checked;
    
    addBookToLibrary(author, title, numPages, isRead);
    
    dialog.close();
    bookForm.reset();
});

// Initial display
displayBooks();
