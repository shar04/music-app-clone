console.log("welcome to musify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/Prema_Velluva.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songitem'));

// Songs array
let songs = [
    { songname: "prema velluva", filepath: "songs/Prema_Velluva.mp3", coverpath: "images/image.jpg" },
    { songname: "Lutt Putt Gaya", filepath: "songs/Lutt_Putt_Gaya.mp3", coverpath: "images/lutput.jpg" },
    { songname: "ocheliya", filepath: "songs/O_Cheliya.mp3", coverpath: "images/ocheliya.jpg" },
    { songname: "shaky", filepath: "songs/Shaky.mp3", coverpath: "images/shaky1.jpg" },
    { songname: "adharam", filepath: "songs/adharam.mp3", coverpath: "images/krishna.jpg" },
    { songname: "heypillagada", filepath: "songs/HeyPillagada.mp3", coverpath: "images/fida.jpg" },
];

// Update song items UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;

    // Load duration for each song
    let tempAudio = new Audio(songs[i].filepath);
    tempAudio.addEventListener("loadedmetadata", () => {
        let mins = Math.floor(tempAudio.duration / 60);
        let secs = Math.floor(tempAudio.duration % 60);
        let duration = `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
        element.getElementsByClassName("timestamp")[0].innerHTML = `${duration} <i id="${i}" class="fa-solid fa-play-circle songItemplay"></i>`;
    });
});

// Utility: reset all play buttons
const resetAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach(el => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
};

// Play a song by index
function playSong(index) {
    resetAllPlays();
    songIndex = index;
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');

    // Update song item button
    let currentBtn = document.getElementById(songIndex.toString());
    if (currentBtn) {
        currentBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    }
}

// Master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Song item play buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('songItemplay')) {
        let index = parseInt(e.target.id);
        playSong(index);
    }
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Handle audio end
audioElement.addEventListener('ended', () => {
    resetAllPlays();
    masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
    gif.style.opacity = 0;
});
