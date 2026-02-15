# Prompt-Powered Kickstart: Building a Beginner’s Toolkit for a Simple Music Player

## Title & Objective

- **Project:** Prompt-Powered Kickstart — Music Player (HTML/CSS/JavaScript)
- **Objective:** Create a beginner-friendly toolkit that helps someone build and run a simple music player using HTML, CSS, and JavaScript. The toolkit includes setup steps, a minimal working example, common errors and fixes, AI prompts used during development, and reflections on using AI.

## Quick Summary of the Technology

- **What it is:** A basic web-based music player using the `<audio>` element, simple controls (play/pause, next, previous), a progress bar, and local file loading via a file input.
- **Where used:** Lightweight audio playback on static sites, demos, and learning projects.
- **Real-world example:** Local music playback in a browser without a backend.

## System Requirements

- OS: macOS / Linux / Windows (browser-based)
- Browser: Modern browser (Chrome, Firefox, Edge, Safari)
- Tools: A text editor (e.g., VS Code) and an HTTP server for local testing (e.g., Python's `http.server`).

## Installation & Setup Instructions

1. Clone or download the project into a folder (project root contains `index.html`, `index.js`, `style.css`).
2. Open a terminal in the project root and run a simple static server:

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

3. On the page, use _Load local audio files_ to pick one or more MP3s from your machine. The player will load and play them.

Notes:

- Files are loaded via the browser's `File` API (no server upload). For portability, keep MP3s in the project `music/` folder if you prefer to reference them by path.

## Minimal Working Example

Files in this project and what they do:

- `index.html` — Basic markup: title, hidden `<audio>` element, file picker, play/prev/next controls, and a range progress slider.
- `index.js` — Wiring for controls, file input handling (`URL.createObjectURL`), progress updates, and song navigation.
- `style.css` — Visual styling for the player card and controls.

Key JavaScript behavior (summary):

- Listen for file input change; build an array of songs: `{ name, fileURL }`.
- `loadSong(song)` sets `audio.src` to `song.fileURL` (or `music/<file>` if using local folder files).
- Play/pause toggles call `audio.play()` and `audio.pause()`.
- `timeupdate` event updates the progress slider; slider input seeks `audio.currentTime`.
- `ended` event advances to the next song.

Example snippet (core load logic):

```javascript
// when files selected
songs = files.map((f) => ({ name: f.name, fileURL: URL.createObjectURL(f) }));
loadSong(songs[0]);
audio.play();

function loadSong(song) {
  title.textContent = song.name;
  audio.src = song.fileURL;
}
```

## How the Code Works (step-by-step)

1. `index.html` creates the UI and includes `index.js` at the end of the body.
2. `index.js` grabs DOM elements (`audio`, controls, file input, progress) and registers event listeners.
3. When the user picks files, the code creates object URLs so the browser can stream the selected files.
4. Control buttons change `audio` state and handle switching between tracks.
5. The progress range shows playback position and seeks when the user drags it.

## Common Errors & Fixes

- Script not loaded / controls unresponsive
  - Cause: Wrong `script` `src` (e.g., `script.js` instead of `index.js`).
  - Fix: Ensure `<script src="index.js"></script>` is present and file exists.

- Audio files not playing (blank/404)
  - Cause: The project `music` entry might be a file containing a path, not a directory. Or wrong relative paths.
  - Fix: Place MP3s into a `music/` folder in the project root, or use the file picker (works without server-side changes).

- Autoplay restrictions
  - Cause: Modern browsers block autoplaying audio without user interaction.
  - Fix: Start playback in response to a user gesture (e.g., button click) or show a play button the user must press.

- CORS when fetching remote resources
  - Cause: Fetching external resources (APIs or remote LRC files) may be blocked by CORS.
  - Fix: Use same-origin resources or a CORS-enabled API, or run a proxy server.

## AI Prompt Journal

Below are sample prompts used while building and learning. Save these prompts as examples when you iterate or adapt the project.

1. Prompt: "Give me a step-by-step guide to build a simple web music player with play/pause, next, prev and file upload using HTML, CSS, and JavaScript."
   - Why: Scaffolded the initial HTML markup and main JS event flow.

2. Prompt: "How do I create object URLs for local files so the browser can play them without uploading?"
   - Why: Learned to use `URL.createObjectURL(file)` for local playback.

3. Prompt: "How can I update a progress slider to reflect audio playback and seek when the user interacts?"
   - Why: Implemented `timeupdate` and slider input handlers.

4. Prompt: "What are common issues when an audio file path doesn't work in a web project?"
   - Why: Diagnosed the `music` file-vs-folder confusion and script path mismatch.

Reflection on AI usage

- AI significantly sped up scoping: initial prompts gave clear examples for markup and event wiring, saving time on boilerplate.
- AI helped surface common pitfalls (autoplay, CORS, file paths) which I then tested for and documented.
- Always verify generated code—AI helps bootstrap, but small adjustments were needed to fit the local project structure.

## References

- MDN Web Docs — HTMLAudioElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
- MDN Web Docs — File API: https://developer.mozilla.org/en-US/docs/Web/API/File
- lyrics.ovh (used previously for exploration): https://lyrics.ovh

## How to Run (recap)

1. Start a simple HTTP server in the project folder:

```bash
python3 -m http.server 8000
```

2. Open http://localhost:8000 in your browser.
3. Click "Load local audio files" and choose MP3(s). Use the controls to play and navigate tracks.

---

If you'd like, I can also:

- A small on-screen playlist view showing filenames has been added (click a filename to play).
- Restore optional lyrics features (local `.lrc` or remote lookup) behind a toggle.
- Add keyboard shortcuts (space for play/pause, arrow keys for skip/seek).

README generated and added to the project to satisfy the capstone documentation requirement.
