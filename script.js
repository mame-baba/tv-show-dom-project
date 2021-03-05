// you can edit ALL of the code here
function setup(){
  const allEpisodes= getAllEpisodes();


  selectingEpisode(allEpisodes);
  filteredEpisode(allEpisodes);
  createPagesForEpisodes(allEpisodes);
}


// setting number zero in front
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}
//creating a function to get title and season number(level 100)
function getSeasonAndTitle(element){
const titleOfEpisode = document.createElement("h4");
titleOfEpisode.id = `S${pad(element.season, 2)}E${pad(element.number, 2)}`;
titleOfEpisode.innerText = `${element.name} - S${pad(element.season, 2)}E${pad(element.number, 2)}`;

return titleOfEpisode;
}
function getImage(element){
  const imageOfEpisode = document.createElement("img");
  imageOfEpisode.id = element.id;
  imageOfEpisode.src = element.image.medium;

  return imageOfEpisode;
    }
function makePageForEpisodes(episodeList){
  //setting up function to get image
//   function getImage(element){
// const imageOfEpisode = document.createElement("img");
// imageOfEpisode.id = episodeImage;
// imageOfEpisode.src = element.image.medium;

// return imageOfEpisode;
//   }
}
  // creating a function to get all three elements(title, summary and image)
  function createEpisode(element){
    const singleEpisode = document.createElement("list");

    singleEpisode.value = element.id;
    singleEpisode.innerHTML = element.summary;

    singleEpisode.insertBefore(getSeasonAndTitle(element), singleEpisode.childNodes[0]);
    singleEpisode.insertBefore(getImage(element), singleEpisode.childNodes[1]);

    return singleEpisode;
  }


  //all episodes creation set up
  function createPagesForEpisodes(episodeList){
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
function searchLive(){
  const allEpisodes = getAllEpisodes();
  // created input on index.html

  let keyInput = document.getElementById("keyInput");

  let filter = keyInput.value.toUpperCase();

  let episodeContainer = document.getElementById("episodeContainer");

  // single episode on the list

  let singleEpisode = episodeContainer.getElementsByTagName("list");

  let counter = 0;

  //for loop
  for (let i = 0; i < allEpisodes.length; i++){
    let title = allEpisodes[i].name ;
    let summary = allEpisodes[i].summary;
    //getting rid of the p tag on the summary using regex
    summary = summary.replace(/(<p> | <\/p>)/g, "");

    if(summary.toUpperCase().indexOf(filter) > -1 || title.toUpperCase().indexOf(filter) > -1){
      singleEpisode[i].classList.remove("hidden");
      counter += 1;
    } else{
      singleEpisode[i].classList.add("hidden");
    }
  }
  document.getElementById("result").textContent = ` showing ${counter} / ${allEpisodes.length} episodes`;
}

// level 300 & 350; creating a function to select episode

function selectingEpisode(allEpisodes){

  let episodeSelection = document.getElementById("episodeSelection");
  let i = 0;

  allEpisodes.forEach(element => {
    let mainMenu = document.createElement("option");

    mainMenu.value = i;
    mainMenu.innerText = `S${pad(element.season, 2)}E${pad(element.number, 2)} - ${element.name}`;

    episodeSelection.appendChild(mainMenu);
    i++;
  })
}
// getting filtered search episode
function filteredEpisode(allEpisodes){

  let selectedEpisode = document.getElementById("episodeSelection");

  selectedEpisode.addEventListener("change", element => {
    let selectedEpisode = element.target.value;

    //
    ul = document.getElementById("episodeContainer");
    //single item on the list

   list = ul.getElementsByTagName("list");

   for( let i = 0; i < allEpisodes.length; i++){
     if(allEpisodes[selectedEpisode] === allEpisodes[i] || selectedEpisode === "allEpisodes"){
       list[i].classList.remove("hidden");
     }
     else{
       list[i].classList.add("hidden")
     }
   }
  });



}
window.onload = setup;
