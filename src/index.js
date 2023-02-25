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
  headerPortrait = document.querySelector(".portrait");
  headerLandscape = document.querySelector(".landscape");

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

  const outerWrap = document.createElement("div");
  outerWrap.className = "text-wrap-outer";
  textSection.appendChild(outerWrap);

  const textWrap = document.createElement("div");
  textWrap.className = "text-wrap";
  outerWrap.appendChild(textWrap);

  const innerWrap = document.createElement("div");
  innerWrap.className = "text-wrap-inner";
  textWrap.appendChild(innerWrap);

  stanzas.forEach((stanza) => {
    const p = document.createElement("p");
    p.innerHTML = stanza;
    innerWrap.appendChild(p);
  });

  const imageSection = document.createElement("section");
  imageSection.className = "images";
  main.appendChild(imageSection);
  imageSection.innerHTML = images;
  imageSection.insertAdjacentHTML("beforeend", "<br />");

  const aboutSection = document.querySelector(".about");
  const aboutButton = document.querySelector(".about-button");
  aboutButton.addEventListener("click", () => {
    aboutSection.classList.toggle("grow");
    aboutSection.classList.toggle("shrink");

    headerPortrait.classList.toggle("set-opacity");
  });
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
