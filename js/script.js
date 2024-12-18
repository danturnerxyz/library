const tableBody = document.querySelector('#table tbody')
const form = document.getElementById('form')
const myLibrary = []
let newBookTitle = document.getElementById('book-title')


form.addEventListener('submit', function(ev) {
    ev.preventDefault()
    let {title, author, genre, pages, read} = ev.target.elements;
    title = title.value
    author = author.value
    genre = genre.value
    pages = pages.value
    read = read.checked

    if (title === '' || author === '' || isNaN(pages)) {
        alert('Please fill in all required fields before submitting')
        return
    }
    addToLibrary(title, author, genre, pages, read)
    displayBooks()
})


function Book(title, author, genre, pages, read) {
    this.title = title
    this.author = author
    this.genre = genre
    this.pages = pages
    this.read = read
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read
}

function addToLibrary(title, author, genre, pages, read) {
    const book = new Book(title, author, genre, pages, read)
    myLibrary.push(book)
}

addToLibrary('Moby Dick', 'Herman Melville', 'Fiction', 378, false)
addToLibrary('The Lord of The Rings', 'J.R.R Tolkein', 'Fantasy', 1077, false)
addToLibrary('Don Quixote', 'Miguel De Cervantes', 'Fiction', 1072, true)
addToLibrary('Charlie and The Chocolate Factory', 'Roald Dahl', 'Children\'s Literature', 208, true)

console.log(myLibrary)

function displayBooks() {
    tableBody.innerHTML = ''
    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr')

        Object.keys(book).forEach(prop => {
            const cell = document.createElement('td')
            cell.textContent = book[prop]
            row.appendChild(cell)
        })
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.dataset.index = index
        row.appendChild(deleteButton)
        
        const readButton = document.createElement('button')
        readButton.innerText = 'Toggle Read'
        readButton.dataset.index = index
        row.appendChild(readButton)

        tableBody.appendChild(row)
    });
}

displayBooks()

tableBody.addEventListener('click', function(ev) {
    const target = ev.target

    if (target.innerText == 'Delete') {
        const index = Number(target.dataset.index)
        myLibrary.splice(index, 1)
        displayBooks()
    }

    if (target.innerText == 'Toggle Read') {
        const index = Number(target.dataset.index)
        myLibrary[index].toggleReadStatus()
        displayBooks()
    }
})