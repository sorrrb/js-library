let myLibrary = [];

function Book(author, title, pages, year, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.year = year;
  this.read = read;
}

function addBookToLibrary() {
  const bookAuthor = prompt('Please enter the author of your book: ');
  const bookTitle = prompt('Please enter the title of your book: ');
  const bookPages = prompt('Please enter the number of pages in your book: ');
  const bookYear = prompt('Please enter the year the book was published: ');
  const bookStatus = prompt('Have you finished reading your book? ');
  const newBook = new Book(bookAuthor, bookTitle, bookPages, bookYear, bookStatus);
  myLibrary.push(newBook);
  displayBooks();
}

const bookContainer = document.querySelector('div.main-content');

function displayBooks() {
  myLibrary.forEach(element => {
    // Create DOM Node with .book-card class
    // Append DOM Node with correct h3,h4,h5,h6
    // Append DOM Node to .main-content
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    const cardContents = document.createElement('div');
    cardContents.classList.add('card-contents');

    bookContainer.appendChild(bookCard);

    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('h4');
    const bookPages = document.createElement('h5');
    const bookYear = document.createElement('h6');
    const bookStatus = (element.read ? true : false);
    const lineRule = document.createElement('hr');

    bookAuthor.textContent = element.author;
    bookTitle.textContent = element.title;
    bookPages.textContent = element.pages;
    bookYear.textContent = '(' + element.year + ')';

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardContents);

    cardTitle.appendChild(bookTitle);
    cardContents.appendChild(bookAuthor);
    cardContents.appendChild(lineRule);
    cardContents.appendChild(bookPages);
    cardContents.appendChild(bookYear);
  });
}

const addBookBtn = document.querySelector('button.add-button');
addBookBtn.addEventListener('click', addBookToLibrary);