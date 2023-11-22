const submitNewBook = document.getElementById('book-submit');
const libraryGrid = document.querySelector('.library-grid');

class Library {
    constructor() {
        this.books = [];
    };

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        };
    };

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    };

    getBook(title) {
        return this.books.find((book) => book.title === title);
    };

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    };
}

const library = new Library();

class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    };
};

const getBookInfo = () => {
    const title = document.getElementById('book-name').value;
    const author = document.getElementById('author-name').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    return new Book(title, author, pages, isRead);
};

const addToLibrary = () => {
    updateLibraryGrid();
    for (let book of library.books) {
        createBook(book);
    }
}

const updateLibraryGrid = () =>{
    libraryGrid.innerHTML = '';
}

const createBook = (book) => {
    const bookItem = document.createElement('div');
    const bookMark = document.createElement('div');
    const titleWrapper = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');

    bookItem.classList.add('book');
    bookMark.classList.add('book-mark');
    titleWrapper.classList.add('title-wrapper');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;


    if (book.isRead) {
        bookMark.classList.add('book-read');
    }

    bookItem.appendChild(pages);
    titleWrapper.appendChild(title);
    titleWrapper.appendChild(author);
    bookItem.appendChild(titleWrapper);
    bookItem.appendChild(bookMark);
    libraryGrid.appendChild(bookItem);
}

const addBook = (e) => {
    e.preventDefault();
    const newBook = getBookInfo();
    library.addBook(newBook);
    addToLibrary();
};

submitNewBook.addEventListener('click', addBook);
