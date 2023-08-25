const audio = document.getElementById("song");
const coverImg = document.querySelector(".cover-img");
const titleElement = document.querySelector("h1");
const artistElement = document.querySelector("p");
const controlIcon = document.querySelector(".control-icon");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("current-time");
const totalTimeText = document.getElementById("total-time");
const previousButton = document.querySelector(".previous-button");

const songs = [
  {
    title: "Babalik Sa'Yo",
    artist: "Moira Dela Torre",
    source: "./songs/moira_dela_torre_babalik_sayo.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "A Million Dreams",
    artist: "The Greatest Showman",
    source: "./songs/a_million_dreams.mp3",
    cover: "./media/thumbnail.png",
  },
];

let currentSongIndex = 0;

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  const previousSong = songs[currentSongIndex];

  audio.src = previousSong.source;
  coverImg.src = previousSong.cover;
  titleElement.textContent = previousSong.title;
  artistElement.textContent = previousSong.artist;

  if (audio.paused) {
    playPause();
  }
}


function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  const nextSong = songs[currentSongIndex];

  audio.src = nextSong.source;
  coverImg.src = nextSong.cover;
  titleElement.textContent = nextSong.title;
  artistElement.textContent = nextSong.artist;

  if (audio.paused) {
    playPause();
  }
}

function playPause() {
  if (audio.paused) {
    audio.play();
    coverImg.classList.add("playing");
    controlIcon.classList.remove("fa-play");
    controlIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    coverImg.classList.remove("playing");
    controlIcon.classList.add("fa-play");
    controlIcon.classList.remove("fa-pause");
  }
}

function updateProgress() {
  const progressPercentage = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercentage;

  // Update current time text
  const currentTimeMinutes = Math.floor(audio.currentTime / 60);
  const currentTimeSeconds = Math.floor(audio.currentTime % 60);
  currentTimeText.textContent = `${currentTimeMinutes}:${currentTimeSeconds.toString().padStart(2, '0')}`;

  // Update total time text
  const totalTimeMinutes = Math.floor(audio.duration / 60);
  const totalTimeSeconds = Math.floor(audio.duration % 60);
  totalTimeText.textContent = `${totalTimeMinutes}:${totalTimeSeconds.toString().padStart(2, '0')}`;
}
  
setInterval(updateProgress, 500);

progress.oninput = function () {
  const seekTime = (audio.duration * progress.value) / 100;
  audio.currentTime = seekTime;
};
