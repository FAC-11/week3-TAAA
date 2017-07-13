// create the youtube element on the DOM
function createYoutubeNode(youtubeFullLink) {

}

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

var availableStations = Object.assign({}, stationObj);

populateMenu("starting-station");
populateMenu("destination-station");
