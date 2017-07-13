var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=baker+street&key=AIzaSyAfqyA0VtNHaSa3PAVzCzBp6TuKR3tFwms';

// var createYoutubeNode = require('./DOM.js');

var object;

var youtubeWatchURL = 'https://www.youtube.com/watch?v=';

// an array of objects to hold youtube info
var youtubeResultsArray = [

];

function httpRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var responseObj = JSON.parse(xhr.responseText);
      console.log(responseObj);
      object = responseObj;
      callback(responseObj);
      // var videoid = responseObj.items[0].id.videoId;

    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

httpRequest(youtubeURL);

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
