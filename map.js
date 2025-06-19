export const map = L.map("map").setView([20, 0], 2); // Lat, Lng, Zoom (global view)

export function initMap() {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}
