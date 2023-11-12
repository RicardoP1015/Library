const myLibrary = [];
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const isRead = document.querySelector('.isRead');


class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead;
        this.info = function () {
            const readOrNot = this.isRead ? 'read' : 'not read yet';
            return (`${this.title} by ${this.author}, ${this.pages} pages, ${readOrNot}`)
        }
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

