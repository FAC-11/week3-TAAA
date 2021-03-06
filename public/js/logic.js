// TFL VARIABLES

var Tfl = {
  front: "https://api.tfl.gov.uk/journey/journeyresults/",
  mid: "/to/",
  end: ""
};
var testTfl = "https://api.tfl.gov.uk/journey/journeyresults/1000003/to/1000139";

// YOUTUBE VARIABLES

// youtube base url
var youtubeWatchURL = 'https://www.youtube.com/watch?v=';

// youtube api base url
var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=';

// for the youtube api call
var youtubeAPIKey = '&key=AIzaSyAfqyA0VtNHaSa3PAVzCzBp6TuKR3tFwms';

// to store the station names
var stationNamesArray = [];

// HTTP REQUEST

function httpRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseObj = JSON.parse(xhr.responseText);
      callback(responseObj);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
  return xhr;
}

// TFL FUNCTIONALITY

function tflExtractData (object) {
  var tflResultsArray = [object.journeys[0].legs[0].departurePoint.commonName.replace(/Underground Station/,"")];
  var journeyLegs = object.journeys[0].legs;
  journeyLegs.forEach(function(el){
    el.path.stopPoints.forEach(function(innerEl){
      tflResultsArray.push(innerEl.name.replace(/Underground Station/,""));
    });
  })
  // here we call the parallel function(result) - this will pass the array without needed to effect global variables
  getYoutubeResultsInParallel(tflResultsArray);
}

function hasSubmitted(to, from) {
  httpRequest(Tfl.front + to + Tfl.mid + from + Tfl.end, tflExtractData);
}

// YOUTUBE FUNCTIONALITY

// creates a youtube link based on videoid
function youtubeRenderURL(obj) {
  return youtubeWatchURL + obj.items[0].id.videoId;
}

// get the thumbnail from youtube responseText object
function getYoutubeThumbnail(obj) {
  return obj.items[0].snippet.thumbnails.default.url;
}

// get the title from youtube responseText object
function getYoutubeTitle(obj) {
  return obj.items[0].snippet.title;
}

// will replace spaces in the youtube search query with '+'
function searchQuery(stationName) {
  stationNamesArray.push(stationName);
  return stationName.replace(/\s/g, '+');
}

// will convert youtube ResponseText object array into youtubeResultsArray
function processYoutubeResponseObjects(reponseArray) {
  result = [];
  reponseArray.forEach(function(el) {
    result.push(createYoutubeObject(el));
  });
  return (result);
}

// return youtube object with 3 properties - url, thumbnail & title
function createYoutubeObject(obj) {
  var url = youtubeRenderURL(obj);
  var thumbnail = getYoutubeThumbnail(obj);
  var title = getYoutubeTitle(obj);
  return {
    url: url,
    thumbnail: thumbnail,
    title: title
  };
}

// return an array of youtube responseText objects
function addStationNameToYoutubeObj(youtubeResultsArray, stationNamesArray) {
  for (var i = 0; i < youtubeResultsArray.length; i++) {
    youtubeResultsArray[i].stationName = stationNamesArray[i];
  }
  return youtubeResultsArray;
}

function getYoutubeResultsInParallel(stationsArray) {

  var remaining = stationsArray.length;
  var requestObjects = []; // currently unutilised - this is for future error testing, so we store the request    //  objects we'd made
  var youtubeResponseObjects = [];
  var stationNamesArray = [];

  // loop through our stations array
  stationsArray.forEach(function(stationName, index) {
    var url = youtubeURL + searchQuery(stationName) + youtubeAPIKey;
    stationNamesArray.push(stationName);
    requestObjects.push(httpRequest(url, function(obj) {
      youtubeResponseObjects[index] = obj;
      remaining--;
      if (!remaining) {
        // an array of objects to hold youtube info
        // - will contain title; thumbnail; url
        var youtubeResultsArray = processYoutubeResponseObjects(youtubeResponseObjects);

        // call a function that will attach the station names to the youtubeResponseObjects
        // then call addYoutubeResultsToDOM with youtubeResponseObjects
        addYoutubeResultsToDOM(addStationNameToYoutubeObj(youtubeResultsArray, stationNamesArray));
      }
    }));
  });
}
