const bookList = document.getElementById("book-list");

const mockBooks = [
  {
    title: "The Shadow Atlas",
    authors: "Jane Harper",
    language: "English",
    city: "Edinburgh",
    state: "Scotland",
    country: "United Kingdom",
  },
  {
    title: "Crimson Reefs",
    authors: "Maria Chen",
    language: "Mandarin",
    city: "Xiamen",
    state: "Fujian",
    country: "China",
  },
  {
    title: "Dust and Stars",
    authors: "Amira El-Tayeb",
    language: "Arabic",
    city: "Cairo",
    state: "Cairo Governorate",
    country: "Egypt",
  },
  {
    title: "Map of Forgotten Trails",
    authors: "Lena Torres",
    language: "Spanish",
    city: "Valparaíso",
    state: "Valparaíso Region",
    country: "Chile",
  },
  {
    title: "Icebound Letters",
    authors: "Greta Norheim",
    language: "Norwegian",
    city: "Tromsø",
    state: "Troms og Finnmark",
    country: "Norway",
  },
];

function getBooks() {
  for (let book of mockBooks) {
    const li = document.createElement("li");
    li.innerHTML = `<b>${book.title}</b>, ${book.authors}`;
    bookList.appendChild(li);
  }
}

export { getBooks };
