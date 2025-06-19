export function getBooksForUser(userId) {
  const data = localStorage.getItem(`books_by_user_${userId}`);
  return data ? JSON.parse(data) : [];
}

export function getCoordinates(userId) {
  const data = localStorage.getItem(`coordinates_by_user_${userId}`);
  return data ? JSON.parse(data) : {};
}

export function getTheme(userId) {
  const data = localStorage.getItem(`theme_by_user_${userId}`);
  return data ? "dark" : "light";
}

export function getLocationStr(city, state, country) {
  return [city, state, country]
    .filter(Boolean)
    .map((item) => item.toUpperCase())
    .join("+");
}

export const geoIcon = L.icon({
  iconUrl: "img/icons8-geo-48.png",

  iconSize: [35, 35],
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
