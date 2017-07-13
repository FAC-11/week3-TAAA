 var Tfl = {
  front: "https://api.tfl.gov.uk/journey/journeyresults/",
  mid: "/to/", 
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

function processApiResponseTfl (respString) {
  var journeyStations = pickOutStations (resp);
  addStationTabsToDOM (journeyStations);
  makeYoutubeRquests (journeyStations);
}

function makeRequest (requestString, processApiResponseFn) {
  var xhr = XMLHttpRequest ();
    xhr.onreadystatechange = function() {
      if (xhr.readystate==4 && xhr.status==200) {
        var resp = JSON.parse (xhr.responseText);
        processApiResponseFn (resp);
      }
    };
    xhr.open ('GET',requestString, true);
    xhr.send ();
    return xhr;
  }

function hasSubmitted (to,from) {
  makeRequest (Tfl.front+to+Tfl.mid+from+Tfl.end,processApiResponseTfl);
}



var availableStations = Object.assign({}, stationObj);

populateMenu("starting-station");
populateMenu("destination-station");
