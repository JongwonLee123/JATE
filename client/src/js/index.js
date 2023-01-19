import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";
import navLogo from "../images/icon_96x96.png";
import faviconLink from "../../favicon.ico";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const navIcon = document.querySelector("#navIcon");
navIcon.src = navLogo;

const favicon = document.querySelector("#favicon");
console.log(favicon)
favicon.href = faviconLink;

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

if ("serviceWorker" in navigator) {
  const workboxSW = new Workbox("/service-worker_GM.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}