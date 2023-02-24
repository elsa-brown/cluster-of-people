const getScreenOrientation = () => {
  console.log("init: ", screen.orientation.type);
  if (screen.orientation.type.match(/portrait/)) {
    return "portrait";
  }
  return "landscape";
};

export default getScreenOrientation;
