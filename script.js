const audio = document.getElementById("song");
const coverImg = document.querySelector(".cover-img");
const titleElement = document.querySelector("h1");
const artistElement = document.querySelector("p");
const controlIcon = document.querySelector(".control-icon");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("current-time");
const totalTimeText = document.getElementById("total-time");
const previousButton = document.querySelector(".previous-button");
const shuffleButton = document.querySelector(".shuffle-button");

const songs = [
  {
    title: "Bawat Piyesa",
    artist: "Track 01 - Munimuni",
    source: "./songs/01_Munimuni_Bawat_Piyesa.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Sayo",
    artist: "Track 02 - Munimuni",
    source: "./songs/02_Munimuni_Sayo.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Talinghaga",
    artist: "Track 03 - Munimuni",
    source: "./songs/03_Munimuni_Talinghaga.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Musika",
    artist: "Track 04 - Dionela",
    source: "./songs/04_Dionela_Musika.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Paraluman",
    artist: "Track 05 - Adie",
    source: "./songs/05_Paraluman_Adie.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Eba",
    artist: "Track 06 - Kiyo",
    source: "./songs/06_Kiyo_Eba.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Balang Araw",
    artist: "Track 07 - I Belong To The Zoo",
    source: "./songs/07_I_Belong_To_The_Zoo_Balang_Araw.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Sana",
    artist: "Track 08 - I Belong To The Zoo",
    source: "./songs/08_I_Belong_To_The_Zoo_Sana.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Kundiman",
    artist: "Track 09 - Silent Sanctuary",
    source: "./songs/09_Silent_Sanctuary_Kundiman.mp3",
    cover: "./media/thumbnail.png",
  },
  {
    title: "Rebound",
    artist: "Track 10 - Silent Sanctuary",
    source: "./songs/10_Silent_Sanctuary_Rebound.mp3",
    cover: "./media/thumbnail.png",
  }
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

audio.addEventListener("ended", () => {
  playNext();
});