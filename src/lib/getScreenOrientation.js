const getScreenOrientation = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  return isPortrait ? "portrait" : "landscape";
};

export default getScreenOrientation;
