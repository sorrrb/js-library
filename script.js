let myLibrary = [];

const bookContainer = document.querySelector('div.main-content');

const modalPopUp = document.querySelector('div.add-overlay');
const modalOpen = document.querySelector('button.add-button');
const emptyBooks = document.querySelector('button.clear-button');
const modalSubmit = document.querySelector('button.submit');
const modalCancel = document.querySelector('button.cancel');

const alertMessage = document.querySelector('p.required-message');

class Book {
  constructor(author, title, pages, year, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.year = year;
    this.read = read;
  }

  changeStatus() {
    this.read = !(this.read);
  }
}

function addBookToLibrary() {
  const bookAuthor = (document.querySelector('input#author')).value;
  const bookTitle = (document.querySelector('input#title')).value;
  const bookPages = (document.querySelector('input#pages')).value + ' pages';
  const bookYear = '(' + (document.querySelector('input#year')).value + ')';
  const bookStatus = (document.querySelector('input#read')).checked;
  
  if (bookAuthor === '' || bookTitle === '' || bookPages === ' pages' || bookYear === '' ) {
    alertMessage.style.visibility = 'visible';
    return;
  }

  alertMessage.style.visibility = 'hidden';
  const newBook = new Book(bookAuthor, bookTitle, bookPages, bookYear, bookStatus);
  myLibrary.push(newBook);
  displayBooks();
  resetFields();
  closeModal();
}

function displayBooks() {
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  }
  myLibrary.forEach((element, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-index', `${index}`);

    bookContainer.appendChild(bookCard);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');

    const cardContents = document.createElement('div');
    cardContents.classList.add('card-contents');
  
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = element.title;

    const bookAuthor = document.createElement('h4');
    bookAuthor.textContent = element.author;

    const bookPages = document.createElement('h5');
    bookPages.textContent = element.pages;

    const bookYear = document.createElement('h6');
    bookYear.textContent = element.year;

    const bookStatus = (element.read ? true : false);
    const bottomLineRule = document.createElement('hr');
    const topLineRule = document.createElement('hr');

    const statusBookRef = document.createElement('h5');
    if (bookStatus) {
      statusBookRef.textContent = 'Read';
      statusBookRef.classList.add('complete');
    }
    else {
      statusBookRef.textContent = 'Not Read';
      statusBookRef.classList.add('incomplete');
    }

    const changeBookRef = document.createElement('img');
    changeBookRef.setAttribute('src', './assets/book-sync.png');
    
    const removeBookRef = document.createElement('img');
    removeBookRef.setAttribute('src', './assets/book-cancel.png');

    const changeButtonContainer = document.createElement('div');
    changeButtonContainer.classList.add('book-buttons');

    const removeButtonContainer = document.createElement('div');
    removeButtonContainer.classList.add('book-buttons');

    changeButtonContainer.appendChild(changeBookRef);
    removeButtonContainer.appendChild(removeBookRef);

    changeBookRef.addEventListener('click', modifyBookReadStatus);
    removeBookRef.addEventListener('click', removeBookFromLibrary);

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(changeButtonContainer);
    bookCard.appendChild(removeButtonContainer);
    bookCard.appendChild(cardContents);

    cardTitle.appendChild(bookTitle);
    cardTitle.appendChild(topLineRule);
    cardTitle.appendChild(statusBookRef);

    cardContents.appendChild(bookAuthor);
    cardContents.appendChild(bottomLineRule);
    cardContents.appendChild(bookPages);
    cardContents.appendChild(bookYear);
  });
}

function modifyBookReadStatus(e) {
  const refToBook = e.path[1].parentNode;
  myLibrary[refToBook.dataset.index].changeStatus();
  const statusText = (refToBook.querySelector('div.card-title')).lastElementChild;
  let newText;
  if (myLibrary[refToBook.dataset.index].read) {
    newText = "Read";
    statusText.classList.toggle('incomplete');
    statusText.classList.toggle('complete');
  }
  else {
    newText = "Not Read";
    statusText.classList.toggle('complete');
    statusText.classList.toggle('incomplete');
  }
  statusText.textContent = newText;
}

function removeBookFromLibrary(e) {
  const bookToRemove = e.path[1].parentNode;
  myLibrary.splice(bookToRemove.dataset.index, 1);
  displayBooks();
}

function clearLibrary() {
  myLibrary = [];
  displayBooks();
}

function resetFields() {
  (document.getElementById('author')).value = '';
  (document.getElementById('title')).value = '';
  (document.getElementById('pages')).value = '';
  (document.getElementById('year')).value = '2022';
}

function openModal() {
  modalPopUp.style.display = "block";
}

function closeModal() {
  alertMessage.style.visibility = "hidden";
  modalPopUp.style.display = "none";
}

emptyBooks.addEventListener('click', clearLibrary);

modalOpen.addEventListener('click', openModal);

modalSubmit.addEventListener('click', addBookToLibrary);

modalCancel.addEventListener('click', closeModal);