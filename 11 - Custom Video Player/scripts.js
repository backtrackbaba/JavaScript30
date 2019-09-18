// Get Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const volumeSlider = document.querySelector('input[name="volume"]')

// Build Functions

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    togglePlayButton();
}

function toggleMute(){
    // volumeSlider = document.querySelector('input[name="volume"]')
    if (video.volume === 0){
        video.volume = previousVolume;
        volumeSlider.value = previousVolume / volumeSlider.max;
    }
    else {
        previousVolume = video.volume;
        video.volume = 0;   
        volumeSlider.value = 0;
    }
}

function handleKeyboardEvents(e){
    // handle spacebar, p and f
    keyCode = e.keyCode;
    switch(keyCode){
        case 32: // Space Button
            togglePlay();
            break;

        case 77: // M
            toggleMute();
            break;

        case 70: // F
            if (!document.fullscreenElement) {
                video.requestFullscreen()
            } else {
                document.exitFullscreen();
            }
            break;

        case 39: // Right Arrow
            video.currentTime += 5
            break;

        case 37: // Left Arrow
            video.currentTime -= 5
            break;

        case 38: // Up Arrow
            currentVolume = video.volume;
            if (currentVolume + 0.05 <= 1){
                video.volume += 0.05
                volumeSlider.value = video.volume / volumeSlider.max;
            }
            else{
                video.volume = volumeSlider.max;
            }
            break;

        case 40: // Down Arrow
            currentVolume = video.volume;
            if (currentVolume - 0.05 >= 0){
                video.volume -= 0.05
                volumeSlider.value = video.volume / volumeSlider.max;
            }
            else{
                video.volume = volumeSlider.min;
            }
            break;
    }
}

function togglePlayButton(){
    toggle.innerHTML = video.paused ? '►' : '❚❚';
}

function skip(){
    skipValue = parseFloat(this.dataset.skip);
    video.currentTime += skipValue
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


let mousedown = false;
let previousVolume = 0;

// Add event listeners
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', handleProgress)

window.addEventListener('keydown', handleKeyboardEvents)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

