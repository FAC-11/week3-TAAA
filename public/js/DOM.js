// Uses availableStations object to populate one drop down menu by its id string
function populateMenu(menuToPopulate) {
 var menu = document.getElementById(menuToPopulate);
 var stationsArray = [];

 Object.keys(availableStations).forEach(function(el) {
   // stationsArray[el] = availableStations[el];
   var menuItem = document.createElement("option");
   menuItem.value = [el];
   menuItem.textContent = availableStations[el];
   menu.appendChild(menuItem);
 })
}

// cloning stationObj into a availableStations
var availableStations = Object.assign({}, stationObj);

//populating youtube results to the DOM
function addYoutubeResultsToDOM(resultsArray){
  removeResultsOnPage();
  // var elementExists = document.getElementById("results-on-page");
  // if (elementExists){
  //   elementExists.parentNode.removeChild(elementExists);
  // }
  var resultSection = document.getElementById("result-section");
  var list = document.createElement('ul');
  list.setAttribute('id', 'results-on-page');
  resultsArray.forEach(function(obj){
    var listItem = document.createElement('li');
    var listHeading = document.createElement('h3');
    //to be updated with station name value
    listHeading.textContent = obj.stationName;
    listItem.appendChild(listHeading);
    var listaTag = document.createElement('a');
    var listImage = document.createElement('img');
    listImage.src = obj.thumbnail;
    listaTag.setAttribute('href',obj.url);
    listaTag.setAttribute('target','_blank');
    listaTag.textContent = obj.title;
    listItem.appendChild(listaTag);
    listaTag.prepend(listImage);
    //append whole list to ul
    list.appendChild(listItem);
  })
  resultSection.appendChild(list);
}

function removeResultsOnPage() {
  var elementExists = document.getElementById("results-on-page");
  if (elementExists){
    elementExists.parentNode.removeChild(elementExists);
  }
}

function domSameStationMessage() {
  removeResultsOnPage();
  var errorHeading = document.createElement('h3');
  errorHeading.setAttribute('id', 'results-on-page');
  errorHeading.textContent = "You're already there.";
  document.getElementById('result-section').appendChild(errorHeading);
}

populateMenu("starting-station");
populateMenu("destination-station");

var submitButton = document.getElementById("submit");
submit.addEventListener ('click', function(ev) {
  ev.preventDefault();
  var startStation = document.getElementById("starting-station").value;
  var destination = document.getElementById("destination-station").value;
  if (startStation != destination)
    hasSubmitted (startStation,destination);
  else {
    // append message to the DOM
    domSameStationMessage();
    console.log("You're already there.")
  }
});
