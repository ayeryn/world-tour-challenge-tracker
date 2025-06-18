const map = L.map("map").setView([20, 0], 2); // Lat, Lng, Zoom (global view)

function initMap() {
  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}

/*
 *  We are using mock data as we build the app and wait for API permission
 * TODO: once we get the API key we'll use GET
 */

function getCountries() {
  const countries = ["USA", "China"];
  return countries;
}

function createCountrySelect() {
  const countrySelect = document.getElementById("countries");
  const countries = getCountries();

  for (let c of countries) {
    const option = document.createElement("option");
    option.value = c;
    option.innerHTML = c;
    countrySelect.appendChild(option);
  }
}

function handleButtons() {
  const showFormBtn = document.getElementById("show-form-btn");
  const hideFormBtn = document.getElementById("hide-form-btn");
  const bookForm = document.getElementById("book-form");

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

/* MAIN stack */
initMap();
handleButtons();
createCountrySelect();
