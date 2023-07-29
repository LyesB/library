let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

const book1 = new Book('Lord of the Rings', 'J.R.R. Tolkien', '1178', 'Not Read');
const book2 = new Book("Harry Potter and the Sorcerer's Stone", 'J.K. Rowling', '309', 'Not Read');
const book3 = new Book('A Tale of Two Cities', 'Charles Dickens', '448', 'Read');
const book4 = new Book('The Autobiography of Malcolm X', 'Alex Haley and Malcolm X', '544', 'Read');

console.log(book1.info());
console.log(book2.info());

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
console.log(myLibrary);

function generateCards(array) {
    let cards = "";
    for (let i = 0; i < array.length; i++) {
        cards += `<li id="listItem">
                        <div id="bookInfo">
                            <div><b>Title</b> : <i>${array[i].title}</i></div>
                            <div><b>Author</b> : <i>${array[i].author}</i></div>
                            <div><b>Pages</b> : <i>${array[i].pages}</i></div>
                            <div><b>Status</b> : <i>${array[i].read}</i></div>
                        </div>    
                        <button id="cardButton" data-index="${i}" >Delete</button>
                  </li>`;
    }
    return cards;
}

document.querySelector('.content').innerHTML = `
    <ol id="cardsList">
        ${generateCards(myLibrary)}
    </ol>
`;


const deleteCardButtons = document.querySelectorAll('#cardButton');
for (const cardButton of deleteCardButtons){
    const cardsList = document.querySelector('#cardsList');
    const cardContent = document.querySelectorAll('#listItem');
    cardButton.addEventListener('click', () => {
        
        let index = cardButton.getAttribute("data-index");
        cardsList.removeChild(cardContent[Number(index)]);
        myLibrary.splice(Number(index),1);
        generateCards(myLibrary);
        const newCardContent = document.querySelectorAll('#listItem');
        console.log(myLibrary);
    });
}

/* const openForm = document.querySelector('#openForm');
openForm.addEventListener('click', () => {
    document.getElementById("form-container").style.display = "block"; 
})

const closeForm = document.querySelector('#closeButton');
closeForm.addEventListener('click', (event) => {
    document.getElementById("form-container").style.display = "none";
    event.preventDefault();
}) */

function openForm(){
    document.getElementById("form-container").style.display = "block"; 
}

function closeForm(){
    document.getElementById("form-container").style.display = "none";
}

const submit = document.querySelector('#addBook');
submit.addEventListener('click', (e) => {
    const titleInput = document.querySelector('#titleInput').value;
    const newTitle = titleInput;

    const authorInput = document.querySelector('#authorInput').value;
    const newAuthor = authorInput;

    const pagesInput = document.querySelector('#pagesInput').value;
    const newPages = pagesInput;

    const statusInput = document.querySelector('#statusInput');
    let newRead;
    if(statusInput.checked){
        newRead = "Read";
    }else{
        newRead = "Not Read";
    }

    let newBook = new Book(newTitle, newAuthor, newPages, newRead);
    addBookToLibrary(newBook);

    document.querySelector('.content').innerHTML = `
    <ol id="cardsList">
        ${generateCards(myLibrary)}
    </ol>
    `;

    closeForm();
    document.querySelector('#titleInput').value = "";
    document.querySelector('#authorInput').value = "";
    document.querySelector('#pagesInput').value = "";
    document.querySelector('#statusInput').checked = false;

   

    console.log(myLibrary);

    e.preventDefault();
});
