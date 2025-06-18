import { initMap } from "./map.js";
import { createCountrySelect } from "./selector.js";
import {
  handleButtons,
  handleSubmit,
  renderBookListForUser,
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
createCountrySelect();
