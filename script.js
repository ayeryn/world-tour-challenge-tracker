import { initMap } from "./map.js";
import { createCountrySelect } from "./selector.js";
import { handleButtons, handleSubmit } from "./handlers.js";
import { getBooks } from "./books.js";

initMap();
getBooks();
handleButtons();
handleSubmit();
createCountrySelect();
addBook();
