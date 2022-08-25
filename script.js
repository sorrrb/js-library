let myLibrary = [];

function Book(author, title, pages, read, rating) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = rating;
  this.rating = rating;
}

function addBookToLibrary() {
  const bookAuthor = prompt('Please enter the author of your book: ');
  const bookTitle = prompt('Please enter the title of your book: ');
  const bookPages = prompt('Please enter the number of pages in your book: ');
  const bookStatus = prompt('Have you finished reading your book? ');
  const bookRating = ((bookStatus === 'Yes' || bookStatus === 'yes') ? prompt('Please enter a rating for your book, 1-5: ') : 'N/A');
  const newBook = new Book(bookAuthor, bookTitle, bookPages, bookStatus, bookRating);
  myLibrary.unshift(newBook);
  console.log(myLibrary);
}

const addBookBtn = document.querySelector('button');
addBookBtn.addEventListener('click', addBookToLibrary);