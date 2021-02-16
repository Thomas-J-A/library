let myLibrary = [];

function Book(title, author, genre, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBook() {
    let formFields = document.querySelectorAll('form input, form select');
    let book = new Book();
    for (let i = 0; i < formFields.length; i++) {
        if (props[i] == 'numPages') {              
            book[props[i]] = +formFields[i].value;
        } else if (props[i] == 'isRead') {
            book[props[i]] = formFields[i].checked;
        } else {
            book[props[i]] = formFields[i].value;
        }
    }
    myLibrary.push(book);
    updateDisplay();
}

function updateDisplay() {
    clearDisplay();
    createCards();
    updateStats();
}


function clearDisplay() {
    const cards = Array.from(section.childNodes);
    for (let i = 0; i < cards.length; i++) {
        section.removeChild(cards[i]);
    }
}

function createCards() {
    for (let i = 0; i < myLibrary.length; i++) {         
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-index', i);
        const cardTop = document.createElement('div');
        cardTop.className = 'info';
        createRemoveIcon(cardTop, i);
        populateCard(cardTop, i);                
        card.appendChild(cardTop);

        const cardBottom = document.createElement('div');
        cardBottom.className = 'toggle';
        if (myLibrary[i].isRead == true) cardBottom.textContent = 'Read';
        else cardBottom.textContent = 'Not Read';
        cardBottom.addEventListener('click', (e) => {
            let index = +e.target.parentNode.getAttribute('data-index');
            if (cardBottom.textContent == 'Read') {
                cardBottom.textContent = 'Not Read';
                myLibrary[index].isRead = false;
            } else {
                cardBottom.textContent = 'Read';
                myLibrary[index].isRead = true;
            }
            updateStats();
        });
        card.appendChild(cardBottom);

        section.appendChild(card);
    }
}

function createRemoveIcon(cardTop, i) {
    const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-trash-alt';
        removeIcon.addEventListener('click', e => {
            let index = +e.target.parentNode.parentNode.getAttribute('data-index');
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

function updateStats() {
    for (let i = 0; i < tableData.length; i++) {
        switch (i) {
            case 0:
                tableData[i].textContent = myLibrary.length;
                break;
            case 1:
                tableData[i].textContent = countBooksRead();
                break;
            case 2:
                tableData[i].textContent = countPagesRead();
                break;
        }
    }

    createGenreList();
}

function countBooksRead() {
    let count = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].isRead == true) count++;
        else continue; 
    }
    return count;
}

function countPagesRead() {
    let count = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].isRead == true) {
            count += myLibrary[i].numPages;
        }
    }
    return count;
}

function createGenreList() {
    // find all unique genres in library                 
    let genres = [];
    for (let i = 0; i < myLibrary.length; i++) {
        if (!genres.includes(myLibrary[i].genre)) {
            genres.push(myLibrary[i].genre);
        }
    }
    genres.sort();

    // delete current genre list
    const children = Array.from(genreList.children);
    for (let i = 0; i < children.length; i++) {
        genreList.removeChild(children[i])
    }

    // create new genre list
    for (let i = 0; i < genres.length; i++) {
        let genre = document.createElement('span');
        genre.textContent = genres[i];
        genreList.appendChild(genre);
    }
}


/* global variables */

const section = document.querySelector('section');
const addBtn = document.querySelector('#add-button');
const modalWrapperOuter = document.querySelector('.modal-wrapper-one');
const modalWrapperInner = document.querySelector('.modal-wrapper-two');
const formSubmit = document.querySelector('#form-submit-button');
const tableData = Array.from(document.querySelectorAll('td'));
const genreList = document.querySelector('.genre-list');
const props = ['title', 'author', 'genre', 'numPages', 'isRead'];


/* event handlers */


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
