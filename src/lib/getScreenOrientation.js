const getScreenOrientation = () => {
  if (
    screen.height > screen.width ||
    (screen.orientation && screen.orientation.type.match(/portrait/))
  ) {
    return "portrait";
  }
  return "landscape";
};

export default getScreenOrientation;
