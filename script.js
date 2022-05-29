let library = [];

function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// selectors ---------------------------------------------------------------
let addBookBtn = document.querySelector("#add-book");
let modal = document.querySelector(".modal");
let form = document.querySelector("#form");
let valid = document.querySelector(".valid");
let main = document.querySelector("main");
let bookCount = document.querySelector(".book-count");
let readCount = document.querySelector(".read-count");
let notReadCount = document.querySelector(".not-read-count");



// event listeners ---------------------------------------------------------
addBookBtn.addEventListener("click", () => toggleModal())
form.addEventListener("submit", (e) => submitForm(e));


// event handlers-----------------------------------------------------------
let toggleModal = () => {
    if(modal.style.display === "block"){
        modal.style.display = "none";
    }else{
        modal.style.display = "block";
    }
}

let submitForm = (e) => {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let status = document.querySelector("#status").checked;

    if(isValid(title, author, pages)){
        valid.innerHTML = "book added to the library...";
        setTimeout(() => {
            valid.innerHTML = "";
        }, 1500);

        clearInput();
        toggleModal();
        addBook(title, author, pages, status);
    }else{
        valid.innerHTML = "incomplete details...";
        setTimeout(() => {
            valid.innerHTML = "";
        }, 1500);
    }
}

let addBook = (title, author, pages, status) => {
    let book = new Book(title, author, pages, status);
    library.push(book);

    localStorage.setItem("library", JSON.stringify(library));

    addBookTile();
}

let addBookTile = () => {
    let localLib = JSON.parse(localStorage.getItem("library"));
    main.innerHTML = "";
    localLib.map((book, id) => {
        return(
            main.innerHTML += `
                <section id = ${id} class="book">
                    <p>Title: <span class="title">${book.title}</span></p>
                    <p>Author: <span class="author">${book.author}</span></p>
                    <p>Pages: <span class="pages">${book.pages}</span></p>
                    <div class="icons">
                        <i onClick = "handleCheckToggle(this)" class="check fa-solid fa-check-double"></i>
                        <i onClick = "handleDelete(this)" class="delete fa-solid fa-trash-can trash"></i>
                    </div>
                </section>
            `
        )
    });

    colorCheckBox(library);
}

let handleCheckToggle = (e) => {
    if(!(e.getAttribute("id") === "check-green")){
        e.setAttribute("id", "check-green");
        library[e.parentElement.parentElement.getAttribute("id")]["status"] = true;
        localStorage.setItem("library", JSON.stringify(library));
    }else{
        e.setAttribute("id", null);
        library[e.parentElement.parentElement.getAttribute("id")]["status"] = false;
        localStorage.setItem("library", JSON.stringify(library));
    }
}

let handleDelete = (e) => {
    let id = e.parentElement.parentElement.id;
    library.splice(id, 1);
    localStorage.setItem("library", JSON.stringify(library));
    e.parentElement.parentElement.remove();
}

let isValid = (title, author, pages) => {
    if(title === "" || author === "" || pages === ""){
        return false;
    }else{
        return true;
    }
}

let clearInput = () => {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
}

let colorCheckBox = (library) => {
    let status = document.querySelectorAll(".check");

    for(let i = 0; i < library.length; i++){
        if(library[i].status === false){
            status[i].setAttribute("id", null);
        }else{
            status[i].setAttribute("id", "check-green");
        }
    }
}

(() => {
    library = JSON.parse(localStorage.getItem("library"));
    let localLib = JSON.parse(localStorage.getItem("library"));
    localLib.map((book, id) => {
        return(
            main.innerHTML += `
                <section id = ${id} class="book">
                    <p>Title: <span class="title">${book.title}</span></p>
                    <p>Author: <span class="author">${book.author}</span></p>
                    <p>Pages: <span class="pages">${book.pages}</span></p>
                    <div class="icons">
                        <i onClick = "handleCheckToggle(this)" class="check fa-solid fa-check-double"></i>
                        <i onClick = "handleDelete(this)" class="delete fa-solid fa-trash-can trash"></i>
                    </div>
                </section>
            `
        )
    })

    colorCheckBox(library);
})();





