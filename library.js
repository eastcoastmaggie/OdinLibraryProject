class Book {
    constructor(title, author, isbn, pageCount, status) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.pageCount = pageCount;
        this.status = status;

        this.getInfo = function () {
            return `${title} by ${author}, ${pageCount} pages.`;
        };
    }
}

let myLibrary = [
    new Book("Think Like a Programmer", "V. Anton Spraul", "978-1-59327-424-5", 256, "unread"),
    new Book("Pride and Prejudice", "Jane Austin", "979-8-68373-376-6", 576, "read"),
    new Book("Brave New World", "Aldous Huxley", "978-0307356543", 272, "read"), 
    new Book("MaddAddam", "Margaret Atwood", "978-0307397997", 416, "read"),
    new Book("Eye of the World", "Robert Jordan", "978-1250768681", 784, "read")
];

const content = document.querySelector('.content');
const modal = document.querySelector('#modal-form');
const modalX = document.querySelector('.close');
const submit = document.querySelector('.submit');
const form = document.querySelector('.new-book');

submit.addEventListener('click', function(e){
    e.preventDefault();
    modal.style.display = 'none';
    let book = new Book(form.elements["title-input"].value, form.elements["author-input"].value, form.elements["isbn-input"].value, form.elements["page-input"].value, "read");
    myLibrary.push(book);
    addBookToLibrary(book, myLibrary.length-1)
})

function addBookToLibrary(book, index){
    console.log(book);
    console.log(index);
    // make a card and push to dom to be displayed as part of the library
    const bookCard = document.createElement('div');
    bookCard.setAttribute('data-index', index);
    if (book.status == 'read'){
        bookCard.classList.add('read');
    }
    bookCard.classList.add('card');
    const title = document.createElement('h2');
    title.textContent = book.title;
    const bookInfo = document.createElement('p');
    let statusUpdate = updateStatus(book);
    const reading = document.createElement('button');
    reading.classList.add('btn');
    reading.textContent = statusUpdate;
    reading.addEventListener('click', ()=> { 
        book.status = statusUpdate;
        statusUpdate = updateStatus(book);
        reading.textContent = statusUpdate;
        if(book.status == 'read'){
            bookCard.classList.add('read');
        } else {
            bookCard.classList.remove('read');
        }
    });
    bookInfo.textContent = book.getInfo();
    const isbn = document.createElement('p');
    isbn.classList.add('isbn');
    isbn.textContent = book.isbn;

    const deleteBook = document.createElement('span');
    deleteBook.textContent = "x";
    deleteBook.classList.add('close');
    deleteBook.addEventListener('click', ()=> { 
        myLibrary.splice(index, 1);
        console.log(myLibrary);
        content.removeChild(bookCard);
    });
    bookCard.appendChild(deleteBook);
    bookCard.appendChild(title);
    bookCard.appendChild(bookInfo);
    bookCard.appendChild(isbn);
    bookCard.appendChild(reading);
    content.appendChild(bookCard);
    
}

function updateStatus(book){
    let statusUpdate = (book.status == 'read') ? 'unread' : 'read'; 
    return statusUpdate;
}

for (let i = 0; i < myLibrary.length; i++){
    addBookToLibrary(myLibrary[i], i);

}

// Modal form
function showModal() {
    modal.style.display = 'block';

    console.log(document.forms);
    
    modalX.addEventListener('click', function(){
        modal.style.display = 'none';
    });
    
}


// add book
let addButton = document.createElement('button');
addButton.textContent = '+';
addButton.classList.add('float-add-btn');
addButton.classList.add('add-book');
addButton.addEventListener('click', showModal);
document.body.appendChild(addButton);
