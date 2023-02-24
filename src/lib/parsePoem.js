const parsePoem = (poemHTML) => {
  const { title, content, url } = poemHTML;

  const textAndImages = content
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "")
    .split(`<br /><br /><br />`);
  const [text, images] = textAndImages;
  const stanzas = text.split(`<br /><br />`);

  const secureUrl = url.replace("http", "https");

  return { title, content: [stanzas, images], url: secureUrl };
};

export default parsePoem;
