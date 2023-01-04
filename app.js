///////// carousels//////////

const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    } else{
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 4000);

////////////navigations and control////////////


////////////toggling music player
const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    // checking for double click manually idk why default dbclick event was not working with this project If you know what could the problem Kindly tell me in the discussion below
    if(clickCount >= 2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
})

/////// back from music player
const backToHomeBtn = document.querySelector('.music-player-section .back-btn');

backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})

//// Access playlist daerah
const listdaerah = document.querySelector('.daerah');
const daerah_img = document.querySelector('.playlist-card-img-daerah');

daerah_img.addEventListener('click', () => {
    listdaerah.classList.add('active');
})

const daerahToMusicPlayer = document.querySelector('.daerah .back-btn');

daerahToMusicPlayer.addEventListener('click', () => {
    listdaerah.classList.remove('active');
})

//// Access playlist Nasional
const listnasional = document.querySelector('.Nasional');
const nasional_img = document.querySelector('.playlist-card-img-nasional');

nasional_img.addEventListener('click', () => {
    listnasional.classList.add('active');
})

const nasionalToMusicPlayer = document.querySelector('.Nasional .back-btn');

nasionalToMusicPlayer.addEventListener('click', () => {
    listnasional.classList.remove('active');
})

//// Access playlist Hits
const listhits = document.querySelector('.hits');
const hits_img = document.querySelector('.playlist-card-img-hits');

hits_img.addEventListener('click', () => {
    listhits.classList.add('active');
})

const hitsToMusicPlayer = document.querySelector('.hits .back-btn');

hitsToMusicPlayer.addEventListener('click', () => {
    listhits.classList.remove('active');
})

//// Access playlist Madefy
const listmadefy = document.querySelector('.madefy');
const madefy_img = document.querySelector('.playlist-card-img-madefy');

madefy_img.addEventListener('click', () => {
    listmadefy.classList.add('active');
})

const madefyToMusicPlayer = document.querySelector('.madefy .back-btn');

madefyToMusicPlayer.addEventListener('click', () => {
    listmadefy.classList.remove('active');
})

//////// access playlist

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})





////////// back from playlist to music player

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})

//////navigation done ////////////////


/////// music
let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];
const qnasional = [...document.querySelectorAll('.qnasional')]

// select all buttons here
const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

// playBtn click event
playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

// pauseBtn click event
pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

// funtion untuk mensettup music
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}
setMusic(0);

// format duration in 00 : 00 format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
}

// seekbar events
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        } else{
            forwardBtn.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//  forward btn
forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

// backward btn
backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

// repeat button

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

// volume section

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

///Membuat queue playlist berjalan
queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i-12);
        playBtn.click();
    })
})

qnasional.forEach((item, i) => {
    item.addEventListener('click',() => {
        setMusic(i +12);
        playBtn.click();
    })
})
