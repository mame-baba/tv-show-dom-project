const allEpisodes = getAllEpisodes();
makePageForEpisodes(allEpisodes);
let root = document.getElementById("root");
let search = document.getElementById("search");

let input = document.getElementById("myInput");
input.type = "text";
input.id = "myInput";
input.onkeyup = "mySearchFunction()";
input.placeholder = "Search";



// setting number zero in front
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let root = document.getElementById("root");
}

function makePageForEpisodes(episodeList) {
  const root = document.getElementById("root");
  allEpisodes.forEach((elem) => {
    let list = document.createElement("div");
    list.classList.add("container-list");
    let title = document.createElement("h2"); //  title

    let img = document.createElement("img"); //  image

    let summary = document.createElement("p"); //  summary
    title.id = "h2";
    img.id = "img";
    summary.id = "p";
    title.innerText = `${elem.name} - S${pad(elem.season, 2)}E${pad(
      elem.number,
      2
    )}`;

    img.src = `${elem.image.medium}`;
    summary.innerHTML = elem.summary;
    list.appendChild(title);
    list.appendChild(img);
    list.appendChild(summary);
    root.appendChild(list);
  });
}
// getAllEpisodes();
function mySearchFunction() {
  // Declare variables
  var input, filter, ul, li, item, i, txtValue;
  //   // User Input
  input = document.getElementById("myInput");
  console.log("input",input);
  //   // Filter, makes search not case sensitive
  filter = input.value.toUpperCase();
  console.log("filter",filter);
  //   // Grabs the parent element by id
  ul = document.getElementsById("root");
  //   // Individual item on list
  li = ul.getElementByTagName("div");

  //   // Treats lists items like an array, where each item can be accessed through it's index
  for (i = 0; i < allEpisodes.length; i++) {
    item = allEpisodes[i].name;
    //    // Iterate over each list episode to see if the value of the input, ignoring case, matches the inner text or inner html of the item.

    if (item.toUpperCase().indexOf(filter) > -1) {
      //     // Displays list items that are a match, and nothing if no match
      ul[i].style.display = "";
    } else {
      ul[i].style.display = "none";
    }
  }
}
  //   input.addEventListener("click", mySearchFunction);

  // mySearchFunction();
  // input.addEventListener('keyup', (event) => {
  //   var search = event.target.value
  //   }


  window.onload = setup;
