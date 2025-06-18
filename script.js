import { initMap } from "./map.js";
import { createCountrySelect } from "./selector.js";
import { handleButtons } from "./buttons.js";
import { getBooks } from "./books.js";

initMap();
getBooks();
handleButtons();
createCountrySelect();
