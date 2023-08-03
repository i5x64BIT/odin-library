const bookMap = new Map();
function Book(title, author, pages, description) {
    this.id = ++Book.id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.isRead = false;

    this.info = function(){
        return JSON.stringify(this);
    }
}
Book.id = 0; //Static variable

const btnAdd = document.querySelector(".content-container .card:last-child");
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form-container form')

function createBookCard(id, title, author, pages, description){
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
    card.innerHTML += 
    `<div class="book-controls">
        <button class="btn btn-danger">Remove</button>
        <button class="btn btn-unread"></button>
    </div>`; //Add the remove btn

    card.setAttribute('data-id', id);

    const btnRemoveBook = card.querySelector(`.card[data-id="${id}"] .btn-danger`)
    btnRemoveBook.addEventListener('click', function() {
        const bookCard = this.parentElement.parentElement;
        removeBookFromMap(id);
        document.querySelector('.content-container').removeChild(bookCard);
    })

    card.querySelector(`.card[data-id="${id}"] .btn-unread`).addEventListener('click', function() {
        book = bookMap.get(id);
        if(book){
            if(!book.isRead){
                setIsRead(book.id, true);
                this.classList = 'btn btn-read';
            } else {
                setIsRead(book.id, false);
                this.classList = 'btn btn-unread';
            }
        }
    })
    
    return card;
}

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

const addBookToMap = (book) =>{
    bookMap.set(book.id, book);
}
const removeBookFromMap = (id) => {
    bookMap.delete(id)
}
const setIsRead = (iBook, isRead) => {
    bookMap.get(iBook).isRead = isRead;
}

const btnSubmitBook = document.querySelector('.form-container .btn')
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
btnSubmitBook.addEventListener('click', () => {
    const book = new Book(
        document.querySelector('.form-container input[name="title"]').value,
        document.querySelector('.form-container input[name="author"]').value,
        document.querySelector('.form-container input[name="pages"]').value,
        document.querySelector('.form-container textarea[name="description"]').value
    );
    addBookToMap(book);
    //Add the book to the ui
    const card = createBookCard(book.id ,book.title, book.author, book.pages, book.description);
    
    document.querySelector('.content-container')
    .insertBefore( card ,document.querySelector('.content-container .card:last-child') );
    hideElem.call(formContainer);
})



