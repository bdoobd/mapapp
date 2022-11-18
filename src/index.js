import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getOffset, addTileLayer, getAddress, validateIP } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});
const locationIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  // iconAnchor: [22, 94],
});
addTileLayer(map);
L.marker([51.505, -0.09], { icon: locationIcon }).addTo(map);

// Event Listeners
btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  // Сделать валидацию значения из поля ввода
  if (validateIP(ipInput.value)) {
    getAddress(ipInput.value)
      .then(setMapData)
      .catch((error) => console.log(error));
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setMapData(mapData) {
  // console.log(mapData);
  const { lat, lng, country, region, timezone } = mapData.location;
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = `${country}, ${region}`;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: locationIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    getOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () =>
  getAddress("84.10.20.10").then(setMapData)
);
