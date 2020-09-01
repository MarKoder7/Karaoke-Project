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
  // filterInput.addEventListener("keyup", filterlist);

  fetch(API_KEY)
    .then((videos) => videos.json())
    .then((videos) => {
      console.log(videos);
      allVideos = videos;
      videos.forEach((video) => {
        //Creating HTML Elements (BootStrap)
        // Creating ancor tag for the video link, it witll contaion the Video Element as a child 
        const link = document.createElement('a');
        // link.href = `https://www.youtube.com/watch?v= ${video.id.videoId}`;
        link.href = `video?v=${video.id.videoId}`;
        // that's an attribuite for the link to open in a new tab (<target = _blank>)
        link.setAttribute('target', '_blank');


        const videoElement = document.createElement("div");
        videoElement.className = "media";
        videoElementsByID[video.id.videoId] = videoElement;

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

        //We need to put the video element in the link Ancor tag Element, then the Ancor tag inside VIDEOS Elemenmt
        link.appendChild(videoElement)
        videosElement.appendChild(link);
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getVideos("");
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

// function filterlist() {
//   console.log(filterInput.value);
//   if (allVideos) {
//     const regExp = new RegExp(filterInput.value, "gi");
//     allVideos.forEach((video) => {
//       if (video.snippet.title.match(regExp)) {
//         console.log(video);

//         videoElementsByID[video.id.videoId].style.display = "";
//         // document.querySelector(`div[data-id=${video.id.videoId}]`).style.display = '';
//       } else {
//         videoElementsByID[video.id.videoId].style.display = "none";
//         // document.querySelector(`div[data-id=${video.id.videoId}]`).style.display = 'none';
//       }
//     });
//     console.log(allVideos);
//   }
// }