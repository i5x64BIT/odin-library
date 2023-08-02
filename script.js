function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
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
const hideElem = function() {this.style.display = 'none'};
form.addEventListener('mouseleave', () => {
    formContainer.addEventListener('click', hideElem);
})
form.addEventListener('mouseenter', () => {
    formContainer.removeEventListener('click', hideElem);
})
