import fetchPoem from "./lib/fetchPoem";
import parsePoem from "./lib/parsePoem";

const init = async () => {
  const poemHTML = await fetchPoem();
  if (!poemHTML) {
    // do something
    return;
  }

  const { title, content, url } = parsePoem(poemHTML);
  const [stanzas, images] = content;

  const h1 = document.querySelector("h1");
  const link = document.createElement("a");
  link.href = url;
  link.innerHTML = title;
  h1.appendChild(link);

  const main = document.querySelector("main");

  const textDiv = document.createElement("div");
  textDiv.className = "text";
  main.appendChild(textDiv);
  stanzas.forEach((stanza) => {
    const p = document.createElement("p");
    p.innerHTML = stanza;
    textDiv.appendChild(p);
  });

  const imageDiv = document.createElement("div");
  imageDiv.className = "images";
  main.appendChild(imageDiv);
  imageDiv.innerHTML = images;
};

/* START */
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => init());
} else {
  init();
}
