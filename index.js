const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const fileInput = document.getElementById("fileInput");
const playlistEl = document.getElementById("playlist");

let songs = [];
let songIndex = 0;

function loadSong(song) {
  title.textContent = song.name || "Untitled";
  if (song.fileURL) {
    audio.src = song.fileURL;
  } else if (song.file) {
    audio.src = "music/" + song.file;
  }
  renderPlaylist();
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

function nextSong() {
  if (!songs.length) return;
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  if (!songs.length) return;
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", nextSong);

fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  songs = files.map((f) => ({ name: f.name, fileURL: URL.createObjectURL(f) }));
  songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
});

function renderPlaylist() {
  if (!playlistEl) return;
  playlistEl.innerHTML = "";
  songs.forEach((s, idx) => {
    const li = document.createElement("li");
    li.textContent = s.name || `Track ${idx + 1}`;
    li.dataset.index = idx;
    if (idx === songIndex) li.classList.add("active");
    li.addEventListener("click", () => {
      songIndex = idx;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

// Ensure playlist reflects programmatic changes
audio.addEventListener("play", renderPlaylist);
audio.addEventListener("pause", renderPlaylist);

// Initial UI state
if (!songs.length) {
  title.textContent = 'No songs loaded — use "Load local audio files"';
}
// End of file
