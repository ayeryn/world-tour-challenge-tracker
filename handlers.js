import { API_KEY } from "./config.js";
import { getBooksForUser, getCoordinates, getLocationStr } from "./utils.js";
import { map } from "./map.js";

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

async function convertToCoordinates(userId, city, state, country) {
  const params = new URLSearchParams();

  if (city) params.append("city", city);
  if (state) params.append("state", state);
  params.append("country", country);
  params.append("api_key", API_KEY);

  const request = `https://geocode.maps.co/search?${params.toString()}`;
  console.log(request);

  try {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    if (!data || data.length === 0) {
      console.error("No results from geocoding API.");
      return [null, null]; // Return fallback tuple
    }

    const { lat, lon } = data[0];

    const coordinates = getCoordinates(userId);
    const locationStr = getLocationStr(city, state, country);
    coordinates[locationStr] = { lat: lat, lon: lon };
    localStorage.setItem(
      `coordinates_by_user_${userId}`,
      JSON.stringify(coordinates)
    );

    return [lat, lon];
  } catch (e) {
    console.error(e);
  }
}

async function getBookCoordinates(userId, city, state, country) {
  const locationStr = getLocationStr(city, state, country);

  // Check if we already cached such location before
  const coordinates = getCoordinates(userId);
  if (locationStr in coordinates) {
    return [coordinates[locationStr].lat, coordinates[locationStr].lon];
  }
  return (
    (await convertToCoordinates(userId, city, state, country)) || [null, null]
  );
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
    if (book.lat && book.lon) {
      L.marker([book.lat, book.lon])
        .addTo(map)
        .bindPopup(`<b>${book.title}</b><br>${book.city}, ${book.country}`);
    }
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
    const [lat, lon] = await getBookCoordinates(userId, city, state, country);
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
