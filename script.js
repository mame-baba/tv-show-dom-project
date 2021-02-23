const allEpisodes = getAllEpisodes();
makePageForEpisodes(allEpisodes);
let root = document.getElementById("root");
let search = document.getElementById("search");

// setting number zero in front
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

//You can edit ALL of the code here
function setup() {
  // const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let root = document.getElementById("root");
}

function makePageForEpisodes(filteredEpisodes) {
  const root = document.getElementById("root");

  for (var i = 0; i < allEpisodes.length; i++) {
    let list = document.createElement("div");

    list.value = i;
    list.className = "episode";
    // console.log(list.value);
    let title = document.createElement("h2"); //  title

    let img = document.createElement("img"); //  image

    let summary = document.createElement("p"); //  summary
    title.id = "h2";
    img.id = "img";
    summary.id = "p";
    title.innerText = `${allEpisodes[i].name} - S${pad(
      allEpisodes[i].season,
      2
    )}E${pad(allEpisodes[i].number, 2)}`;
    img.src = `${allEpisodes[i].image.medium}`;
    summary.innerHTML = allEpisodes[i].summary;

    list.appendChild(title);

    list.appendChild(img);

    list.appendChild(summary);

    root.appendChild(list);
  }
}
// getAllEpisodes();
function mySearchFunction() {
  // Declare variables
  var input, filter, item, i;

  let filteredEpisodes = [];
  //   // User Input
  input = document.getElementById("myInput");
  console.log(input);

  //   // Filter, makes search not case sensitive
  filter = input.value.toUpperCase();

  console.log("filter", filter);
  //   // Grabs the parent element by id
  root = document.getElementById("root");

  //   // Individual item on list
  episodes = document.getElementsByClassName("episode");

 root.innerHTML = "";

  // Treats lists items like an array, where each item can be accessed through it's index
  for (i = 0; i < allEpisodes.length; i++) {
    item = allEpisodes[i].name;
    // Iterate over each list episode to see if the value of the input, ignoring case, matches the inner text or inner html of the item.

    if (item.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      // filteredEpisodes.push(episodes[i])  ;

      episodes[i].style.display = "none";
    }
  }
}

window.onload = setup;

