const submitNewBook = document.getElementById('book-submit');
const libraryGrid = document.querySelector('.library-grid');
const title = document.getElementById('book-name')
const author = document.getElementById('author-name')
const pages = document.getElementById('pages')
const bookForm = document.getElementById('new-book-form')
const deleteBtn = document.getElementById('delete-btn')
const editBtn = document.getElementById('edit-btn')

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
    };
};

const updateLibraryGrid = () => {
    libraryGrid.innerHTML = '';
};

const createBook = (book) => {
    const bookItem = document.createElement('div');
    const bookTools = document.createElement('div');
    const deleteBtn = document.createElement('div');
    const deleteIcon = document.createElement('i');
    const bookMark = document.createElement('div');
    const titleWrapper = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');

    bookItem.classList.add('book');
    bookTools.classList.add('book-tools')
    deleteBtn.classList.add('delete');
    deleteIcon.classList.add('fa-solid');
    deleteIcon.classList.add('fa-trash');
    deleteBtn.setAttribute('data-title', book.title);
    deleteBtn.addEventListener('click', removeBook);
    bookMark.textContent = book.isRead ? 'Read' : 'Not Read';
    bookMark.classList.toggle('book-read', book.isRead);
    bookMark.setAttribute('data-title', book.title);
    bookMark.addEventListener('click', toggleRead);
    bookMark.classList.add('book-mark');
    titleWrapper.classList.add('title-wrapper');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    title.textContent = `${book.title}`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;


    if (book.isRead) {
        bookMark.classList.add('book-read');
    } 
    
    bookItem.appendChild(pages);
    deleteBtn.appendChild(deleteIcon);
    bookTools.appendChild(deleteBtn);
    bookItem.appendChild(bookTools);
    titleWrapper.appendChild(title);
    titleWrapper.appendChild(author);
    bookItem.appendChild(titleWrapper);
    bookItem.appendChild(bookMark);
    libraryGrid.appendChild(bookItem);
};

const inputCheck = () => {
    if (title.value === '' || author.value === '' || pages.value === '') {
        title.placeholder = 'Please Enter Book';
        author.placeholder = 'Please Enter Author';
        pages.placeholder = 'Please Enter Amount';
        return false;
    } else {
        return true;
    };
};

const addBook = (e) => {
    e.preventDefault();
    const validInput = inputCheck();
    if (!validInput) {
        return;
    } else {
        const newBook = getBookInfo();
        library.addBook(newBook);
        saveLocal();
        addToLibrary();
        bookForm.reset();
    };
};

const toggleRead = (e) => {
    const title = e.target.getAttribute('data-title');
    const book = library.getBook(title); 

    if (book) {
        book.isRead = !book.isRead; 
        e.target.textContent = book.isRead ? 'Read' : 'Not Read'; 
        e.target.classList.toggle('book-read', book.isRead); 

        saveLocal(); 
    };
};

const removeBook = (e) => {
    const title = e.target.getAttribute('data-title') || e.target.parentNode.getAttribute('data-title');

    library.removeBook(title);
    saveLocal();
    addToLibrary();
};


const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books));
};

const loadLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'));
    if (books) {
        library.books = books.map(bookData => new Book(bookData.title, bookData.author, bookData.pages, bookData.isRead));
        addToLibrary(); 
    };
};

submitNewBook.addEventListener('click', addBook);
loadLocal();