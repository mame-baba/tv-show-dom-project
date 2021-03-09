// you can edit ALL of the code here
function setup() {
  // const allEpisodes = getAllEpisodes();
  // fetch("https://api.tvmaze.com/shows/82/episodes")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     let allEpisodes = data;
  //     selectingEpisode(allEpisodes);
  //     filteredEpisode(allEpisodes);
  //     createPagesForEpisodes(allEpisodes);

  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
    showSelection();
    makeShow();


  // selectingEpisode(allEpisodes);
  // filteredEpisode(allEpisodes);
  // createPagesForEpisodes(allEpisodes);
  // let singleEpisode = episodeContainer.getElementsByTagName("list");
  // async function allEpisodes(){
  //   const promise = await fetch("https://api.tvmaze.com/shows/82/episodes");
  //   const episodes = await promise.json();
  //   return episodes;
  // }
}

// For each show, you must display at least name, image, summary, genres, status, rating, and runtime.
let allShow = getAllShows();
let showDisplay = document.getElementById("show-display");
function makeShow (){
  let chooseShow = document.getElementById("showSelection");
  let showDisplay = document.getElementById("show-display");

allShow.forEach((show) =>{
// For each show, you must display at least name, image, summary, genres, status, rating, and runtime.
let showContainer = document.createElement("div");

let showName = document.createElement("h2");
let showImage = document.createElement("img");
let showSummary = document.createElement("p");
 let showGenre = document.createElement("h4");
 let showStatus = document.createElement("h4");
 let showRating = document.createElement("h4");
 let showRuntime =document.createElement("h4");

showName.innerText = show.name;
if(show.image) {showImage.src = show.image.medium;
}else{
  showImage.src = "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965__340.png"; // image not found link
}

showSummary.innerHTML = show.summary;
showGenre.innerText = show.genres.join(",");
showStatus.innerText = show.status;
showRating.innerText = show.rating.average;
showRuntime.innerText = show.runtime;

showContainer.appendChild(showName);
showContainer.appendChild(showImage);
showContainer.appendChild(showSummary);
showContainer.appendChild(showGenre);
showContainer.appendChild(showStatus);
showContainer.appendChild(showRating);
showContainer.appendChild(showRuntime);


showDisplay.appendChild(showContainer);

showContainer.addEventListener("click",  function(event) {
  let showId = event.target.value;
  getEpisode(showId);

})
const titleOfEpisode = document.createElement("h4"); // adding an event listener to get the episode when title is clicked 
titleOfEpisode.addEventListener("click", function(event) {
  let titleOfEpisode
})
})
}

function getEpisode(showId){
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let allEpisodes = data;
        selectingEpisode(allEpisodes);
        filteredEpisode(allEpisodes);
        createPagesForEpisodes(allEpisodes);
      })
      .catch(function (error) {
        console.log(error);
      });
}


function showSelection() {
  let chooseShow = document.getElementById("showSelection");
  // let allShow = getAllShows();

  allShow.forEach((show) => {
    let showMenu = document.createElement("option");
    showMenu.value = show.id;
    showMenu.innerText = show.name;
    chooseShow.appendChild(showMenu);

  });
  chooseShow.addEventListener("change", function (event) {
    let showId = event.target.value;
    showDisplay.value = "hidden";

    getEpisode(showId);
  });
}

// setting number zero in front
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
//creating a function to get title and season number(level 100)
function getSeasonAndTitle(element) {
  const titleOfEpisode = document.createElement("h4");
  titleOfEpisode.id = `S${pad(element.season, 2)}E${pad(element.number, 2)}`;
  titleOfEpisode.innerText = `${element.name} - S${pad(
    element.season,
    2
  )}E${pad(element.number, 2)}`;

  return titleOfEpisode;
}
function getImage(element) {
  const imageOfEpisode = document.createElement("img");
  imageOfEpisode.id = element.id;
  imageOfEpisode.src = element.image.medium;

  return imageOfEpisode;
}
function makePageForEpisodes(episodeList) {}
// creating a function to get all three elements(title, summary and image)
function createEpisode(element) {
  const singleEpisode = document.createElement("list");

  singleEpisode.value = element.id;
  singleEpisode.innerHTML = element.summary;

  singleEpisode.insertBefore(
    getSeasonAndTitle(element),
    singleEpisode.childNodes[0]
  );
  singleEpisode.insertBefore(getImage(element), singleEpisode.childNodes[1]);

  return singleEpisode;
}

//all episodes creation set up
function createPagesForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.textContent = `Got${episodeList.length} episode(s)`;

  let episodeContainer = document.createElement("ul");

  episodeContainer.id = "episodeContainer";
  episodeContainer.innerHTML = "";

  // for each episode
  episodeList.forEach((episode) => {
    episodeContainer.appendChild(createEpisode(episode));
  });
  rootElem.appendChild(episodeContainer);
}

// live search
function searchLive() {
  const allEpisodes = getAllEpisodes();
  // created input on index.html

  let keyInput = document.getElementById("keyInput");

  let filter = keyInput.value.toUpperCase();

  let episodeContainer = document.getElementById("episodeContainer");

  // single episode on the list

  let singleEpisode = episodeContainer.getElementsByTagName("list");

  let counter = 0;

  //for loop
  for (let i = 0; i < allEpisodes.length; i++) {
    let title = allEpisodes[i].name;
    let summary = allEpisodes[i].summary;
    //getting rid of the p tag on the summary using regex
    summary = summary.replace(/(<p> | <\/p>)/g, "");

    if (
      summary.toUpperCase().indexOf(filter) > -1 ||
      title.toUpperCase().indexOf(filter) > -1
    ) {
      singleEpisode[i].classList.remove("hidden");
      counter += 1;
    } else {
      singleEpisode[i].classList.add("hidden");
    }
  }
  document.getElementById(
    "result"
  ).textContent = ` showing ${counter} / ${allEpisodes.length} episodes`;
}

// level 300 & 350; creating a function to select episode

function selectingEpisode(allEpisodes) {
  let episodeSelection = document.getElementById("episodeSelection");
  let i = 0;

  allEpisodes.forEach((element) => {
    let mainMenu = document.createElement("option");

    mainMenu.value = i;
    mainMenu.innerText = `S${pad(element.season, 2)}E${pad(
      element.number,
      2
    )} - ${element.name}`;

    episodeSelection.appendChild(mainMenu);
    i++;
  });
}
// getting filtered search episode
function filteredEpisode(allEpisodes) {
  let selectedEpisode = document.getElementById("episodeSelection");

  selectedEpisode.addEventListener("change", (element) => {
    let selectedEpisode = element.target.value;

    ul = document.getElementById("episodeContainer");

    list = ul.getElementsByTagName("list");

    for (let i = 0; i < allEpisodes.length; i++) {
      if (
        allEpisodes[selectedEpisode] === allEpisodes[i] ||
        selectedEpisode === "allEpisodes"
      ) {
        list[i].classList.remove("hidden");
      } else {
        list[i].classList.add("hidden");
      }
    }
  });
}
window.onload = setup;
