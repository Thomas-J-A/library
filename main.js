let myLibrary = [
    {
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        genre: 'Adventure',
        numPages: 766,
        isRead: true
    },
    {
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens',
        genre: 'Fantasy',
        numPages: 349,
        isRead: false
    },
    {
        title: '1984',
        author: 'George Orwell',
        genre: 'Science Fiction',
        numPages: 435,
        isRead: false
    }
];

function Book(title, author, genre, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBook() {
    let book = new Book();
    for (let i = 0; i < formFields.length; i++) {
        if (props[i] == 'numPages') {              
            book[props[i]] = `${formFields[i].value}pgs`;
        } else {
            book[props[i]] = formFields[i].value;
        }
    }
    myLibrary.push(book);
    updateDisplay();
}

function updateDisplay() {
    clearDisplay();
    for (let i = 0; i < myLibrary.length; i++) {         
        const card = document.createElement('div');
        card.className = 'card';
        const cardTop = document.createElement('div');
        cardTop.className = 'info';
        createRemoveIcon(cardTop, i);
        populateCard(cardTop, i);                
        card.appendChild(cardTop);

        const cardBottom = document.createElement('div');
        cardBottom.className = 'toggle';
        cardBottom.textContent = 'Read';
        card.appendChild(cardBottom);

        section.appendChild(card);
    }
}


function clearDisplay() {
    const cards = Array.from(section.childNodes);
    for (let i = 0; i < cards.length; i++) {
        section.removeChild(cards[i]);
    }
}

function createRemoveIcon(cardTop, i) {
    const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-trash-alt';
        removeIcon.setAttribute('data-index', i);
        removeIcon.addEventListener('click', e => {
            console.log(e.target)
            let index = +e.target.getAttribute('data-index');
            myLibrary.splice(index, 1);
            updateDisplay();
        });
        cardTop.appendChild(removeIcon);
}

function populateCard(cardTop, i) {
    for (let j = 0; j < 4; j++) {      
        let para = document.createElement('p');
        para.textContent = myLibrary[i][props[j]];
        cardTop.appendChild(para);
    }
}


/* create global variables */

const section = document.querySelector('section');
const addBtn = document.querySelector('#add-button');
const formFields = document.querySelectorAll('form input, form select');
const modalWrapperOuter = document.querySelector('.modal-wrapper-one');
const modalWrapperInner = document.querySelector('.modal-wrapper-two');
const formSubmit = document.querySelector('#form-submit-button');
const props = ['title', 'author', 'genre', 'numPages'];



/* create event handlers */


// open modal form
addBtn.addEventListener('click', () => {     
    modalWrapperOuter.style.display = 'block';
});

// close form when user clicks outside of modal
window.addEventListener('click', (e) => {      
    if(e.target == modalWrapperInner) {
        modalWrapperOuter.style.display = 'none';
    }
});

// submit modal form details
formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    addBook();
    modalWrapperOuter.style.display = 'none';
});

updateDisplay();
