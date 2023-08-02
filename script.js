const arrBook = [];
function Book(title, author, pages, description) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.isRead = false;

    this.info = function(){
        return JSON.stringify(this);
    }
}

const btnAdd = document.querySelector(".content-container .card:last-child");
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form-container form')

btnAdd.addEventListener('click', () => {
    formContainer.style.display = 'flex';
})
function hideElem() {this.style.display = 'none'};
form.addEventListener('mouseleave', () => {
    formContainer.addEventListener('click', hideElem);
})
form.addEventListener('mouseenter', () => {
    formContainer.removeEventListener('click', hideElem);
})

const addBookToLibrary = (book) =>{
    arrBook.push(book);
}
const setIsRead = (iBook, isRead) => {
    arrBook[iBook].isRead = isRead;
}

const btnSubmitBook = document.querySelector('.form-container .btn')
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
btnSubmitBook.addEventListener('click', () => {
    function createBookCard(title, author, pages, description){
        const card = document.createElement('div');
        card.classList = 'card';

        const bTitle = document.createElement('h3');
        bTitle.classList = 'book-info';
        bTitle.innerText = title;

        const bPages = document.createElement('p');
        bPages.classList = 'book-info';
        bPages.innerText = `${pages} Pages`;

        const bAuthor = document.createElement('p');
        bAuthor.classList = 'book-info';
        bAuthor.innerText = author;

        const bDescription = document.createElement('p');
        bDescription.classList = 'book-description text-small';
        bDescription.innerText = description;

        [bTitle, bPages, bAuthor, bDescription].forEach(e => card.appendChild(e));
        card.innerHTML += '<div class="book-controls"><button class="btn btn-danger">Remove</button></div>'; //Add the remove btn
        return card;
    }
    addBookToLibrary( new Book(
        document.querySelector('.form-container input[name="title"]').value,
        document.querySelector('.form-container input[name="author"]').value,
        document.querySelector('.form-container input[name="pages"]').value,
        document.querySelector('.form-container textarea[name="description"]').value
    ));
    //Add the book to the ui
    const book = JSON.parse( arrBook[arrBook.length-1].info() );
    const card = createBookCard(book.title, book.author, book.pages, book.description);
    
    document.querySelector('.content-container')
    .insertBefore( card ,document.querySelector('.content-container .card:last-child') );
    hideElem.call(formContainer);
})