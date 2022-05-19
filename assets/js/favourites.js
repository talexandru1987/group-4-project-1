function handleFavClick() => {
  console.log("ahdbjahdbjahdsha");

  //        ----------- SAVE THIS MOVIE TO LOCAL STORAGE  ----------------------------- 
  const readFromLocalStorage = (key, defaultValue) => {
    // get from LS using key name
    const dataFromLS = localStorage.getItem(key);
  
    // parse data from LS
    const parsedData = JSON.parse(dataFromLS);
  
    if (parsedData) {
      return parsedData;
    } else {
      return defaultValue;
    }
  };

  //function to render the favourite cards onto the favourites page
  renderFavCards () => {
    //render the favecard movie div & delete button
    const faveMovieCard =  ``

      //append to container
      $("#fave-container").append(faveMovieCard);

      //sort out alphabetically from the object array in LS
      const movie = []
      movie.sort();
      return movie;

  };

  //when the cards show up we can have the option to delete 
  $("#btn").on("click").remove(faveMovieCard);
};



//write to local storage
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};



//code to execute when ready
const onReady = () => {
  //target the heart button
  .on("click", handleFavClick);
  //handle the navbar
  handleNavBarToggle();
  //add an event listener to the movie cards container
  $("#search-results-container").on("click", checkMovieCard);
};

//check if document is ready
$(document).ready(onReady);