 var Tfl = {
  front: "https://api.tfl.gov.uk/journey/journeyresults/"
  mid: "/to/"
  end: ""};

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


function makeRequest (requestString) {
  var xhr = XMLHttpRequest ();
    xhr.onreadystatechange = function() {
      if (xhr.readystate==4 && xhr.status==200) {
        var resp = JSON.parse (xhr.responseText);
      }
    };
    xhr.open ('GET',requestString, true);
    xhr.send ();
    return xhr;
  }

function hasSubmitted () {
  
}



var availableStations = Object.assign({}, stationObj);

populateMenu("starting-station");
populateMenu("destination-station");
