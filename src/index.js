import { validateIP } from "./helpers";

// const url =
//   "https://geo.ipify.org/api/v2/country?apiKey=at_OdAYDZ56SgEg5W0cdxlr7ooOysJYH&ipAddress=8.8.8.8";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

// Event Listeners
btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  // Сделать валидацию значения из поля ввода
  if (validateIP(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_OdAYDZ56SgEg5W0cdxlr7ooOysJYH&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(setMapData)
      .catch((error) => console.log(error));
  }
  //   console.log(ipInput.value);
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setMapData(mapData) {
  console.log(mapData);
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = `${mapData.location.country}, ${mapData.location.region}`;
  timezoneInfo.innerText = mapData.location.timezone;
  ispInfo.innerText = mapData.isp;
}
