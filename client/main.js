let API_KEY = "http://localhost:5000/videos/";
const videosElement = document.querySelector("#videos");
const filterInput = document.querySelector("#filter");
let allVideos;
let videoElementsByID = {}; // an object array to hold the search results

function getVideos(search) {
  API_KEY = "http://localhost:5000/videos/";
  allVideos = null;
  videoElementsByID = {};
  videosElement.innerHTML = "";
  API_KEY += "?search=" + search;
  filterInput.addEventListener("keyup", filterlist);

  fetch(API_KEY)
    .then((videos) => videos.json())
    .then((videos) => {
      allVideos = videos;

      videos.forEach((video) => {
        //Creating elements for bootstrap
        const videoElement = document.createElement("div");
        videoElement.className = "media";
        videoElementsByID[video.id.videoId] = videoElement;
        //videoElement.dataset.id = video.id.videoId;
        // videoElement.id = video.id.videoId;

        const img = document.createElement("img");
        img.src = video.snippet.thumbnails.medium.url;
        img.className = "mr-3";
        videoElement.appendChild(img);

        const mediaBody = document.createElement("div");
        mediaBody.className = "media-body";
        videoElement.appendChild(mediaBody);

        const h5 = document.createElement("h5");
        h5.className = "mt-0 mb-1 col";
        h5.textContent = video.snippet.title;
        mediaBody.appendChild(h5);

        //we need to put the video element in the VIDEOS element
        videosElement.appendChild(videoElement);
      });
    });
}

function filterlist() {
  console.log(filterInput.value);
  if (allVideos) {
    const regExp = new RegExp(filterInput.value, "gi");
    allVideos.forEach((video) => {
      if (video.snippet.title.match(regExp)) {
        console.log(video);

        videoElementsByID[video.id.videoId].style.display = "";
        // document.querySelector(`div[data-id=${video.id.videoId}]`).style.display = '';
      } else {
        videoElementsByID[video.id.videoId].style.display = "none";
        // document.querySelector(`div[data-id=${video.id.videoId}]`).style.display = 'none';
      }
    });
    console.log(allVideos);
  }
}
// trhis is another
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      let search = document.getElementById("search");
      if (search.value) {
        // not blank
        let searchString = search.value;
        if (searchString.length > 3) {
          getVideos(searchString);
        }
      }
    });
});