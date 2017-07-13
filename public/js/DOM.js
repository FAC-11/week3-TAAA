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
  var resultSection = document.getElementById("result-section");
  var list = document.createElement('ul');
  resultsArray.forEach(function(obj){
    var listItem = document.createElement('li');
    var listHeading = document.createElement('h3');
    //to be updated with station name value
    listHeading.textContent = "station name";
    listItem.appendChild(listHeading);
    var listaTag = document.createElement('a');
    var listImage = document.createElement('img');
    listImage.src = obj.thumbnail;
    listaTag.setAttribute('href',obj.url);
    listaTag.textContent = obj.title;
    listItem.appendChild(listaTag);
    listaTag.prepend(listImage);
    //append whole list to ul
    list.appendChild(listItem);
  })
  resultSection.appendChild(list);
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
    console.log("You're already there.")
  }
});
