const map = L.map("map").setView([20, 0], 2); // Lat, Lng, Zoom (global view)

function initMap() {
  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}

// Call all necessary functions here
initMap();
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
