const map = L.map("map").setView([20, 0], 2); // Lat, Lng, Zoom (global view)

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

function addBook(){
  
}

const handleClick = () => {
  console.log("Test");
};
