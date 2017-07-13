// TFL VARIABLES

var Tfl = {
 front: "https://api.tfl.gov.uk/journey/journeyresults/",
 mid: "/to/",
 end: ""};
var testTfl = "https://api.tfl.gov.uk/journey/journeyresults/1000003/to/1000139";
// YOUTUBE VARIABLES

// var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=baker+street&key=AIzaSyAfqyA0VtNHaSa3PAVzCzBp6TuKR3tFwms';

var youtubeWatchURL = 'https://www.youtube.com/watch?v=';


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
  var result = [object.journeys[0].legs[0].departurePoint.commonName.replace(/Underground Station/,"")];
  var journeyLegs = object.journeys[0].legs;
  journeyLegs.forEach(function(el){
    el.path.stopPoints.forEach(function(innerEl){
      result.push(innerEl.name.replace(/Underground Station/,""));
    });
  })
  // here we call the parallel function(result) - this will pass the array without needed to effect global variables
  parallel(result)
}

function hasSubmitted (to,from) {
  httpRequest (Tfl.front+to+Tfl.mid+from+Tfl.end,processApiResponseTfl);
}

// YOUTUBE FUNCTIONALITY

// creates a youtube link based on videoid
function youtubeRenderURL(obj) {
  return youtubeWatchURL + obj.items[0].id.videoId;
}

function getYoutubeThumbnail(obj) {
  return obj.items[0].snippet.thumbnails.default.url;
}

function getYoutubeTitle(obj) {
  return obj.items[0].snippet.title;
}

// var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=baker+street&key=AIzaSyAfqyA0VtNHaSa3PAVzCzBp6TuKR3tFwms';

var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=';

var youtubeAPIKey = '&key=AIzaSyAfqyA0VtNHaSa3PAVzCzBp6TuKR3tFwms';


// will replace spaces with '+'
function searchQuery(stationName) {
  return stationName.replace(/\s/g, '+');
}

// will convert youtube ResponseText object array into youtubeResultsArray
function processYoutubeResponseOjects (reponseArray) {
  result = [];
  reponseArray.forEach (function (el) {
    result.push(createYoutubeObject (el));
  });
  return (result);
}

function createYoutubeObject(obj) {
  var url = youtubeRenderURL(obj);
  var thumbnail = getYoutubeThumbnail(obj);
  var title = getYoutubeTitle(obj);
  return { url: url, thumbnail: thumbnail, title: title};
}

// return an array of youtube responseText objects

function parallel(stationsArray) {

  // var count = 0;
  var remaining = stationsArray.length;
  var requestObjects = [];  // currently unutilised - this is for future error testing, so we store the request    //  objects we'd made
  var youtubeResponseObjects = [];

  stationsArray.forEach(function(stationName, index) {
    var url = youtubeURL + searchQuery(stationName) + youtubeAPIKey;
    requestObjects.push(httpRequest(url, function(obj) {
      youtubeResponseObjects[index] = obj;
      remaining-- ;
      if (!remaining) {
        // an array of objects to hold youtube info
        // - will contain title; thumbnail; url
        var youtubeResultsArray = processYoutubeResponseOjects (youtubeResponseObjects);
        console.log(youtubeResultsArray);
        addYoutubeResultsToDOM (youtubeResultsArray);
      }
    }));
  });

}

// this will be the first call from the DOM submit
httpRequest(testTfl,tflExtractData);
