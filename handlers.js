import { API_KEY } from "./config.js";

const showFormBtn = document.getElementById("show-form-btn");
const hideFormBtn = document.getElementById("hide-form-btn");
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

export function handleButtons() {
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

// Just grab the books and do nothing else
function getBooksForUser(userId) {
  const data = localStorage.getItem(`books_by_user_${userId}`);
  return data ? JSON.parse(data) : [];
}

export function renderBookListForUser(userId) {
  const books = getBooksForUser(userId);
  bookList.innerHTML = "";

  for (let book of books) {
    const li = document.createElement("li");
    li.innerHTML = `<p><b>${book.title}</b>, ${book.authors}</p>`;

    // Add delete icon and event handler
    const button = document.createElement("button");
    button.setAttribute("aria-label", "Delete book");
    button.className = "delete-btn";
    button.innerHTML = "<i class='bi bi-x-circle'1></i>";
    button.addEventListener("click", () => {
      let currentBooks = getBooksForUser(userId);
      currentBooks = currentBooks.filter(
        (b) => !(b.title === book.title && b.authors === book.authors)
      );
      localStorage.setItem(
        `books_by_user_${userId}`,
        JSON.stringify(currentBooks)
      );

      renderBookListForUser(userId);
    });

    li.appendChild(button);
    bookList.appendChild(li);
  }
}

async function convertToCoordinates(city, state, country) {
  let request = "https://geocode.maps.co/search?";
  if (city !== "") {
    request += `city=${city.replace(" ", "+")}&`;
  }
  if (state !== "") {
    request += `state=${state.replace(" ", "+")}&`;
  }
  request += `country=${country.replace(" ", "+")}&api_key=${API_KEY}`;
  console.log("Request: " + request);

  try {
    const response = await fetch(request);
    const data = await response.json();
    return [data[0].lat, data[0].lon];
  } catch (e) {
    console.error(e);
  }
}

export function handleSubmit(userId) {
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const title = formData.get("title");
    const authors = formData.get("authors");
    const city = formData.get("city");
    const state = formData.get("state");
    const country = formData.get("country");
    const [lat, lon] = await convertToCoordinates(city, state, country);
    const newBook = {
      title: title,
      authors: authors,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lon: lon,
    };

    // Update user's list in localStorage
    const books = getBooksForUser(userId);
    books.push(newBook);
    localStorage.setItem(`books_by_user_${userId}`, JSON.stringify(books));

    showFormBtn.disabled = false;
    hideFormBtn.hidden = true;
    bookForm.reset();
    bookForm.hidden = true;

    renderBookListForUser(userId);
  });
}
