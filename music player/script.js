console.log("welcome to musify");

// Initialize variables
let songindex = 0;
let audioElement = new Audio('prema velluva.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songname: "prema velluva", filepath: "prema velluva.mp3", coverpath: "image.jpg" },
    { songname: "Lutt Putt Gaya", filepath: "Lutt Putt Gaya.mp3", coverpath: "lutput.jpg" },
    { songname: "ocheliya", filepath: "O Cheliya.mp3", coverpath: "ocheliya.jpg" },
    { songname: "shaky", filepath: "Shaky.mp3", coverpath: "shaky1.jpg" },
    { songname: "adharam", filepath: "adharam.mp3", coverpath: "krishna.jpg" },
    { songname: "heypillagada", filepath: "HeyPillagada.mp3", coverpath: "fida.jpg" },
];

// Update UI with song details and duration
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;

    // Load each song to get duration
    let tempAudio = new Audio(songs[i].filepath);
    tempAudio.addEventListener("loadedmetadata", () => {
        let mins = Math.floor(tempAudio.duration / 60);
        let secs = Math.floor(tempAudio.duration % 60);
        let duration = `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
        element.getElementsByClassName("timestamp")[0].innerHTML = `${duration} <i id="${i}" class="fa-solid fa-play-circle songItemplay"></i>`;
    });
});

// Toggle masterplay button
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

// Seek functionality
myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

// Utility to reset all song play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle individual song play
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('songItemplay')) {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songindex].filepath;
        mastersongname.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    }
});

// Update play/pause state when audio ends
audioElement.addEventListener('ended', () => {
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    makeAllPlays();
});

// Update play/pause state when paused
audioElement.addEventListener('pause', () => {
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length;
    playCurrentSong();
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    playCurrentSong();
});

// Function to play current song based on songindex
function playCurrentSong() {
    makeAllPlays();
    audioElement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

    // Set pause icon on the correct play button
    let currentBtn = document.getElementById(songindex.toString());
    if (currentBtn) {
        currentBtn.classList.remove('fa-play-circle');
        currentBtn.classList.add('fa-pause-circle');
    }
}
