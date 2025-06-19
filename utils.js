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
