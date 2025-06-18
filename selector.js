const countrySelect = document.getElementById("countries");
const stateSelect = document.getElementById("states");

/*
 *  We are using mock data as we build the app and wait for API permission
 * TODO: once we get the API key we'll use GET
 */
function getStates(country) {
  return country === "USA"
    ? ["CA", "TX", "NC", "IL"]
    : ["Shandong", "Shanghai", "Chengdu"];
}

function createStateSelect(country) {
  const states = getStates(country);
  stateSelect.innerHTML = "<option value=''>--Please choose--</option>";

  for (let state of states) {
    const option = document.createElement("option");
    option.value = state;
    option.innerHTML = state;
    stateSelect.appendChild(option);
  }
}

function getCountries() {
  const countries = ["USA", "China"];
  return countries;
}

export function createCountrySelect() {
  const countries = getCountries();

  countrySelect.addEventListener("change", () => {
    stateSelect.disabled = false;
    createStateSelect(countrySelect.value);
  });

  for (let c of countries) {
    const option = document.createElement("option");
    option.value = c;
    option.innerHTML = c;
    countrySelect.appendChild(option);
  }
}
