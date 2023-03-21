/* eslint-disable no-undef */
const addbtn = document.querySelector('#add-book-btn')
const submit = document.querySelector('.form-container > button[type="submit"]')
const close = document.querySelector('.form-container > button[type="button"]')
const formContainer = document.querySelector('.form-container')
const formWrapper = document.querySelector('.form-wrapper')
const libContainer = document.querySelector('.library-container')
const footertext = document.getElementById('footertext')

addbtn.addEventListener('click', openForm)
submit.addEventListener('click', createBook)
close.addEventListener('click', closeForm)

const library = []
let bookcounter = 1

const date = new Date()
const year = date.getFullYear()
footertext.textContent = '© ' + year + footertext.textContent

library.push(new Book(bookcounter, 'One Piece', 'Eiichiro Oda', '900', '1', date.getDate))

function Book (id, title, author, totalpages, userpages, dateadded) {
  this.id = id
  this.title = title
  this.author = author
  this.totalpages = totalpages
  this.userpages = userpages
  this.dateadded = dateadded
}

Book.prototype.completion = function () {
  // eslint-disable-next-line eqeqeq
  if (this.userpages == this.totalpages) {
    return 'Fishined.'
  } else {
    return 'Not finished yet.'
  }
}

function closeForm () {
  toggleForm()
  addbtn.disabled = false
}

function openForm () {
  toggleForm()
  addbtn.disabled = true
}

function toggleForm () {
  loadBooks()
  formContainer.reset()
  formWrapper.classList.toggle('hidden')
}

function createBook () {
  // eslint-disable-next-line eqeqeq
  if (title.value == '' || author.value == '' || pages.value == '' || userpages.value == '') return
  bookcounter++
  const book = new Book(bookcounter, title.value, author.value, pages.value, userpages.value)
  library.push(book)

  event.preventDefault()

  closeForm()
}

function loadBooks () {
  if (library.length < 1) return
  for (books in library) {
    const idname = '#' + (library[books].id)
    if (document.getElementById(idname) == null) { createBookDOM(books) } else { continue };
  }
}

function createBookDOM (books) {
  const bookDiv = document.createElement('div')
  const bookID = '#' + bookcounter

  bookDiv.setAttribute('class', 'book-container')
  bookDiv.setAttribute('id', bookID)

  const bookEntry = document.createElement('p')
  bookEntry.setAttribute('class', 'book-entry')
  bookEntry.textContent = 'Entry #' + library[books].id

  const bookTitle = document.createElement('p')
  bookTitle.setAttribute('class', 'book-title')
  bookTitle.textContent = library[books].title

  const bookAuthor = document.createElement('p')
  bookAuthor.setAttribute('class', 'book-author')
  bookAuthor.textContent = 'by ' + library[books].author

  const bookPages = document.createElement('p')
  bookPages.setAttribute('class', 'book-pages')
  bookPages.textContent = 'Page: ' + library[books].userpages + '/' + library[books].totalpages

  const bookComplete = document.createElement('p')
  bookComplete.setAttribute('class', 'user-pages')
  bookComplete.textContent = 'Status: ' + library[books].completion()

  const btnDelete = document.createElement('button')
  btnDelete.setAttribute('class', 'delete-book')
  btnDelete.textContent = 'Delete'
  btnDelete.addEventListener('click', deleteBook)

  bookDiv.appendChild(bookEntry)
  bookDiv.appendChild(bookTitle)
  bookDiv.appendChild(bookAuthor)
  bookDiv.appendChild(bookPages)
  bookDiv.appendChild(bookComplete)
  bookDiv.appendChild(btnDelete)
  libContainer.appendChild(bookDiv)
}

function deleteBook () {
  const element = document.getElementById(event.target.parentNode.id)
  library.splice(event.target.parentNode.id.toString().shift, 1)
  element.remove()
}

loadBooks()
