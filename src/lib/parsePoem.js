const parsePoem = (poemHTML) => {
  const { title, content, url } = poemHTML;

  const textAndImages = content
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "")
    .split(`<br /><br /><br />`);

  const [text, images] = textAndImages;
  const stanzas = text.split(`<br /><br />`);

  return { title, content: [stanzas, images], url };
};

export default parsePoem;
