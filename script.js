import { initMap } from "./map.js";
import { createCountrySelect } from "./selector.js";
import {
  handleButtons,
  handleSubmit,
  renderBookListForUser,
  toggleTheme,
} from "./handlers.js";

function getOrCreateUserId() {
  let userId = localStorage.getItem("user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("user_id", userId);
  }
  return userId;
}

const currentUserId = getOrCreateUserId();

initMap();
renderBookListForUser(currentUserId);
handleButtons();
handleSubmit(currentUserId);
toggleTheme(currentUserId);
createCountrySelect();
