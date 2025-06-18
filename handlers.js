const showFormBtn = document.getElementById("show-form-btn");
const hideFormBtn = document.getElementById("hide-form-btn");
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

function handleButtons() {
  showFormBtn.addEventListener("click", () => {
    /*
     * When Add Book is clicked:
     * 1. Add Book becomes disabled
     * 2. Cancel appears
     * 3. Form appears
     */
    showFormBtn.disabled = true;
    hideFormBtn.hidden = false;
    bookForm.hidden = false;
  });

  hideFormBtn.addEventListener("click", () => {
    /*
     * When Cancel is clicked:
     * 1. Add Book becomes available
     * 2. Cancel disappears
     * 3. Form clears and disappears
     */
    showFormBtn.disabled = false;
    hideFormBtn.hidden = true;
    bookForm.reset();
    bookForm.hidden = true;
  });
}

function handleSubmit() {
  bookForm.addEventListener("submit", () => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    const title = formData.title;
    const authors = formData.authors;
    // const city = formData.city;
    // const state = formData.state;
    // const country = formData.country;

    // const newBook = {
    //   title: title,
    //   authors: authors,
    //   city: city,
    //   state: state,
    //   country: country,
    // };

    // mockBooks.push(newBook);
    const li = document.createElement("li");
    li.innerHTML = `<b>${title}</b>, ${authors}`;
    bookList.appendChild(li);

    showFormBtn.disabled = false;
    hideFormBtn.hidden = true;
    bookForm.reset();
    bookForm.hidden = true;
  });
}

export { handleButtons, handleSubmit };
