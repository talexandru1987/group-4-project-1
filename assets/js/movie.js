//variable to store the API key
const apiKey = "ab8ecba8f8msh3f5afdafcf2d348p1b6b52jsne7b90c6a16b4";
//basic search url
const baseURL = "https://online-movie-database.p.rapidapi.com/title/find?q=";

let movie;
let mockData = false;

//create the options for the fetch request
const options = {
  method: "GET",
  // headers: {
  //   "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  //   "X-RapidAPI-Key": apiKey,
  // },
};

//the function for the api call
const fetchData = async (url, options = {}) => {
  try {
    if (mockData) {
      const response = await fetch(
        "./assets/data/dataReponseYear.json",
        options
      );
      const data = await response.json();
      return data;
    } else {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getArrayFromString = (string) => {
  //split into separate tags
  const stringArray = string.split(",");
  //create the p tags for each element in the map
  const tags = stringArray.map(
    (
      tag
    ) => `<p class="tag is-dark is-large is-info column is-two-thirds title is-3 has-text-white" 
  id="director">${tag.trim()}</p>`
  );
  return tags.join("");
};

//render the rating cards
const renderMovieRatings = (string) => {
  //create the p tags for each element in the map
  const tags = string.map(
    (tag) => ` <div class="tile is-parent is-shady">
    <article class="tile is-child notification message-header">
        <p class="title is-6 has-text-white is-spaced has-text-centered is-flex is-align-content-center is-justify-content-center">${tag.Source}</p>
        <p class="title is-1 has-text-white is-spaced has-text-centered is-flex is-align-content-center is-justify-content-center" id="movie-rating">${tag.Value}</p>
    </article>
</div>`
  );

  return tags.join("");
};

// const renderYoutubeTrailer = async () => {
//   const searchTerm = `${movie.Title} ${movie.Year} trailer`;

//   const data = await execute(searchTerm);

//   console.log(data);
// };

const renderMovieInfo = (movie) => {
  const movieContainer = `<section class="is-flex">
    <div
      class="columns is-half-desktop is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd"
    >
      <!-- Movie poster image - to be pulled from the imdb api-->

      <div
        class="column is-half-desktop is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd is-justify-content-flex-start"
      >
        <!-- <div class="column"> -->
        <img
          class="movie-image"
          src="${movie?.Poster}"
        />
      </div>

      <!-- Movie Title and Synopisis - to be pulled from the imdb api-->
      <div
        class="has-text-centered column is-half is-spaced message-header is-justify-content-flex-end"
      >
        <!-- <div class="column is-half-desktop is-spaced message-header is-full-mobile is-half-tablet is-half-desktop is-half-widescreen is-half-fullhd"> -->
        <!-- <div class="column is-half"> -->

        <div>
          <h1 id="movie-title" class="title is-1 has-text-white is-spaced">
            ${movie.Title}
          </h1>
          <h1 id="movie-synopsis" class="subtitle is-3 has-text-white">
          ${movie.Plot}
           
          </h1>
        </div>

        <!-- Buttons -->
        <div class="buttons are-large is-spaced is-responsive column is-full" >
                        

            <button class="button is-spaced is-halfwidth " id="trailer-button" data-target="modal-js-example">
                View Trailer 
            </button>

            

            <!-- Add to favourites button - to be hooked up to the favourites page -->
            <button class="button is-spaced is-halfwidth" id="favorite-btn">Add to Favourites</button>

        </div>
  

    
   
  </section>
  
  <section class="section container m-auto">
  <hr>

  <!-- Country info goes here -->
  <div class="columns is-full tags">
      <h1 class="column title is-3 has-text-white">Country:</h1>

      ${getArrayFromString(movie.Country)}
      
  </div>  

  <!-- Release date information section -->
  <div class="columns is-full is-spaced tags mt-5 is-flex-wrap-wrap">
      <h1 class="column title is-3 has-text-white">Release Date:</h1>
      <p class="tag is-dark is-large is-info column is-two-thirds title is-3 has-text-white" 
      id="director">${movie.Released}</p>
      </div>

      <!-- Release date information section -->
      <div class="columns is-full is-spaced tags mt-5 is-flex-wrap-wrap">
          <h1 class="column title is-3 has-text-white">Duration:</h1>
          <p class="tag is-dark is-large is-info column is-two-thirds title is-3 has-text-white" 
          id="director">${movie.Runtime}</p>
          </div>


  <!-- Genre information section -->
  <div class="columns is-full tags">
      <h1 class="column title is-3 has-text-white">Genre:</h1>

  <!-- Below is what we want to populate with director info pulled from the imdb API -->
  
       ${getArrayFromString(movie.Genre)}
  </div>  

  <!-- Director information section -->
  <div class="columns is-full tags">
      <h1 class="column title is-3 has-text-white">Director:</h1>

  <!-- Below is what we want to populate with director info pulled from the imdb API -->

      ${getArrayFromString(movie.Director)}
  </div>  


  <!-- Film actors information section -->
  <div class="columns is-full is-spaced tags mt-5 is-flex-wrap-wrap">
      <h1 class="column title is-3 has-text-white">Cast:</h1>

  <!-- Below is what we want to populate with actor info pulled from the imdb API -->
     
      ${getArrayFromString(movie.Actors)}
    

  </div> 
  <hr>
  </section>

  <!-- Tiles section starts here -->
  <section>
  <h1 id="movie-title" class="title is-1 has-text-white is-spaced has-text-centered"> RATINGS</h1>
      <div class="sandbox container">
          <div class="tile is-ancestor ">
          ${renderMovieRatings(movie.Ratings)}
    
       
           
          </div>

          <hr>
  `;

  $("#main-container").append(movieContainer);
  // $("#movie-page-hero-btn").click(renderYoutubeTrailer);
};

//add the favorite movie to local storage
const favoriteToLocalStorage = () => {
  console.log("test");
  //read from local storage
  const favorites = readFromLocalStorage("favorites", []);
  const isDuplicate = !!favorites.find((favorite) => {
    return favorite.imdbID === movie.imdbID;
  });
  console.log(isDuplicate);

  //if it's not a duplicate then add to local storage
  if (!isDuplicate) {
    //create the object
    const favoriteValue = {};
    //add the key and value to the object
    favoriteValue["title"] = movie.Title;
    favoriteValue["yearRelease"] = movie.Year;
    favoriteValue["runtime"] = movie.Runtime;
    favoriteValue["imdbID"] = movie.imdbID;
    favoriteValue["poster"] = movie.Poster;
    //push to the array
    favorites.push(favoriteValue);
    //add to local storage
    writeToLocalStorage("favorites", favorites);
  }
};

//code to execute when ready
const onReady = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=ae0076fc`;

  movie = await fetchData(url, options);

  renderMovieInfo(movie);

  $("#favorite-btn").on("click", favoriteToLocalStorage);

  // Event listener for the trailer button
$("#trailer-button").click(console.log("trailer button clicked"));

  // Youtube API functions
  await loadClient();
  await execute(`${movie.Title} ${movie.Year} HD trailer`)
};

//check if document is ready
$(document).ready(onReady);
