let modal = document.querySelector(".modal");
let btnAddBook = document.querySelector("#btn-add-book");
let btnSubmitBook = document.querySelector("#btn-submit-book");
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let read = document.querySelector("#read");
let main = document.querySelector("main");


let flag = false;

btnAddBook.addEventListener("click", () => {
    flag=!flag;

    if(flag === true){
        modal.style.display = "block";
    }else{
        modal.style.display = "none"
    }
});

let library = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book){
    library.push(book);
    document.querySelector(".book-count").textContent = `${library.length}`;
    document.querySelector(".read-count").textContent = `${library.length}`;
    document.querySelector(".not-read-count").textContent = `${library.length}`;

    let newBookTile = document.createElement("section");
    newBookTile.setAttribute("class", "book");

    newBookTile.innerHTML = `
        <p>Title: <span class="title">${book.title}</span></p>
        <p>Author: <span class="author">${book.author}</span></p>
        <p>Pages: <span class="pages">${book.pages}</span></p>
        <div class="icons">
            <i class="fa-solid fa-check-double"></i>
            <i class="fa-solid fa-trash-can trash"></i>
        </div>
    `

    main.appendChild(newBookTile);
    modal.style.display = "none";
    flag = false;
}

btnSubmitBook.addEventListener("click", (e) => {
    e.preventDefault();
    let titleVal = title.value;
    let authorVal = author.value;
    let pagesVal = pages.value;
    let readVal = read.checked;

    if(titleVal === "" || authorVal === "" || pagesVal === "" || readVal === ""){
        alert("please enter complete details");
        return;
    }

    let book = new Book(titleVal, authorVal, pagesVal, readVal);
    
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

    addBookToLibrary(book)
})