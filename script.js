const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("control_icon");
const coverImg = document.querySelector(".cover-img");

const songs = [
  {
    title: "Babalik Sa'Yo",
    artist: "Moira Dela Torre",
    src: "./songs/moira_dela_torre_babalik_sayo.mp3",
    thumbnail: "./media/thumbnail.png",
  },

  {
    title: "A Million Dreams",
    artist: "The Greatest Showman",
    src: "./songs/a_million_dreams.mp3",
    thumbnail: "./media/thumbnail.png",
  },
];

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (song.paused) {
    song.play();
    coverImg.classList.add("playing");
    controlIcon.classList.remove("fa-play");
    controlIcon.classList.add("fa-pause");
  } else {
    song.pause();
    coverImg.classList.remove("playing");
    controlIcon.classList.add("fa-play");
    controlIcon.classList.remove("fa-pause");
  }
}

function updateProgress() {
  progress.value = song.currentTime;
}

setInterval(updateProgress, 500);

progress.oninput = function () {
  song.currentTime = progress.value;
  if (song.paused) {
    playPause();
  }
};
