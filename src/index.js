import lib from "./lib";

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

const updateOrientation = () => {
  const orientation = getScreenOrientation();
  if (orientation === "portrait") {
    showHeaderPortrait();
  } else {
    showHeaderLandscape();
    window.scrollTo(0, 1);
  }
};

const init = async () => {
  /* Orientation setup */
  headerPortrait = document.querySelector(".js-portrait");
  headerLandscape = document.querySelector(".js-landscape");

  updateOrientation();
  window.addEventListener("resize", updateOrientation);

  /* Get and show poem */
  const poemHTML = await fetchPoem();
  const { title, content } = await parsePoem(poemHTML);
  const [stanzas, images] = content;

  const main = document.querySelector("main");

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
