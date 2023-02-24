const getScreenOrientation = () => {
  if (screen.orientation.type.match(/portrait/)) {
    return "portrait";
  }
  return "landscape";
};

export default getScreenOrientation;
