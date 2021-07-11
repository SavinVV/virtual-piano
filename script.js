
const notes = document.querySelector('.btn-notes'),
      letters = document.querySelector('.btn-letters'),
      keys = document.querySelectorAll('.piano-key'),
      container = document.querySelector('.btn-container'),
      piano = document.querySelector('.piano'),
      fullscreen = document.querySelector('.fullscreen');


const letNotDict = {
    '68': 'c',
    '70': 'd',
    '71': 'e',
    '72': 'f',
    '74': 'g',
    '75': 'a',
    '76': 'b',
    '82': 'c♯',
    '84': 'd♯',
    '85': 'f♯',
    '73': 'g♯',
    '79': 'a♯'
};

// Переключение нот и букв

container.addEventListener('click', e => {
    if (e.target == notes) {
        if (!notes.classList.contains('btn-active')) {
            notes.classList.add('btn-active');
            letters.classList.remove('btn-active');
            keys.forEach(key => {
                key.classList.remove('piano-key-letter');
            });
        }          
    } else if (e.target == letters) {
        if (!letters.classList.contains('btn-active')) {
            letters.classList.add('btn-active');
            notes.classList.remove('btn-active');
            keys.forEach(key => {
                key.classList.add('piano-key-letter');
            });
        }
    }
});

// Воспроизвести аудио

function playAudio(src) {
    let audio = new Audio();
    audio.src = `assets/audio/${src}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

// Нажать мышкой

function pressKeyMouse(event){
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.add('piano-key-active');
        playAudio(event.target.getAttribute('data-note'));
        event.target.addEventListener('mouseout', function() {
            event.target.classList.remove('piano-key-active');
        });
        piano.addEventListener('mouseup', () => {
            event.target.classList.remove('piano-key-active');
            piano.removeEventListener('mouseover', func);
        });
        let func = function(e) {
            if (e.target.classList.contains('piano-key')) {
                e.target.classList.add('piano-key-active');
                playAudio(e.target.getAttribute('data-note'));
            }
            e.target.addEventListener('mouseout', function() {
                e.target.classList.remove('piano-key-active');
            });
        };
        piano.addEventListener('mouseover', func);
    }
}

// Нажать клавиатурой

function pressKeyKeyboard(event){
    if (event.which in letNotDict && !event.repeat) {
        let keyboardKey = letNotDict[event.which];
        let key = document.querySelector(`.piano-key[data-note='${keyboardKey}']`);
        key.classList.add('piano-key-active');
        playAudio(keyboardKey);
        event.target.addEventListener('keyup', function() {
            key.classList.remove('piano-key-active');
        });
        event.target.addEventListener('mouseout', function() {
            event.target.classList.remove('piano-key-active');
        });
    }
}


piano.addEventListener('mousedown', e => {
    pressKeyMouse(e);
});

window.addEventListener('keydown', e => {
    pressKeyKeyboard(e);
});

// fullscreen

fullscreen.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});


