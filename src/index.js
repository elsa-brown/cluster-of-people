import lib from "./lib";
import { MobileOrientation } from "mobile-orientation";

const { errorMessage, fetchPoem, parsePoem, getScreenOrientation } = lib;
const githubUrl = "https://github.com/elsa-brown/cluster-of-people";

let headerPortrait, headerLandscape;

const showHeaderLandscape = () => {
  headerPortrait.classList.add("hide");
  headerLandscape.classList.remove("hide");
};

const showHeaderPortrait = () => {
  headerPortrait.classList.remove("hide");
  headerLandscape.classList.add("hide");
};

const init = async () => {
  const orientation = new MobileOrientation();
  const main = document.querySelector("main");

  const poemHTML = await fetchPoem();
  const { title, content } = await parsePoem(poemHTML);
  const [stanzas, images] = content;

  headerPortrait = document.querySelector(".js-portrait");
  headerLandscape = document.querySelector(".js-landscape");

  const orientationInitial = getScreenOrientation();
  if (orientationInitial === "portrait") {
    showHeaderPortrait();
  } else {
    showHeaderLandscape();
  }

  orientation.on("landscape", () => showHeaderLandscape());
  orientation.on("portrait", () => showHeaderPortrait());

  const h1 = headerLandscape.querySelector("h1");
  const link = document.createElement("a");
  link.href = githubUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.innerHTML = title;
  h1.appendChild(link);

  const textSection = document.createElement("section");
  textSection.className = "text";
  main.appendChild(textSection);

  stanzas.forEach((stanza) => {
    const p = document.createElement("p");
    p.innerHTML = stanza;
    textSection.appendChild(p);
  });

  const imageSection = document.createElement("section");
  imageSection.className = "images";
  main.appendChild(imageSection);
  imageSection.innerHTML = images;
  imageSection.insertAdjacentHTML("beforeend", "<br />");
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
