// TFL VARIABLES

var Tfl = {
 front: "https://api.tfl.gov.uk/journey/journeyresults/",
 mid: "/to/",
 end: ""};
var testTfl = "https://api.tfl.gov.uk/journey/journeyresults/1000003/to/1000139";
var object;
var stationNames = [];
// YOUTUBE VARIABLES

var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=baker+street&key=AIzaSyAfqyA0VtNHaSa3PAVzCzBp6TuKR3tFwms';

// var createYoutubeNode = require('./DOM.js');

var youtubeWatchURL = 'https://www.youtube.com/watch?v=';

// an array of objects to hold youtube info
var youtubeResultsArray = [

];

// HTTP REQUEST

function httpRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseObj = JSON.parse(xhr.responseText);
      object = responseObj;
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
  stationNames = result;
  // here we call the parallel function(result) - this will pass the array without needed to effect global variables

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

function createYoutubeObject(obj) {
  var url = youtubeRenderURL(obj);
  var thumbnail = getYoutubeThumbnail(obj);
  var title = getYoutubeTitle(obj);
  return { url: url, thumbnail: thumbnail, title: title};
}

httpRequest(testTfl,tflExtractData);


// hasSubmitted();
