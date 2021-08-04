const audio = document.querySelector('audio');
const piano = document.getElementById("pianoBoard");

let mouseMoveTarget;

piano.addEventListener('click', playAudio);
piano.addEventListener('mousedown', mouseDown);
piano.addEventListener('mouseup', mouseUp);

window.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    playAudioKeyboardDown(event)
});
window.addEventListener('keyup', (event) => {
    if (event.repeat) return;
    playAudioKeyboardUp(event)
});
window.addEventListener('mouseup', () => {
    piano.removeEventListener("mousemove", mouseMove);
    mouseMoveTarget && mouseMoveTarget.classList && mouseMoveTarget.classList.remove('piano-key-active');
});

document.addEventListener("onclick", () => {
    changeKeyNameToLetters();
});
document.addEventListener("onclick", () => {
    changeKeyNameToNotes();
});

function changeKeyNameToLetters(event) {
    event.target.classList.add("btn-active");
    document.getElementById("notes").classList.remove("btn-active");
    const pianoKey = document.getElementById("pianoBoard");

    const keysSharp = document.getElementById("pianoBoardSharp");
    const pianoKeyAndSharpChildNodes = [...pianoKey.childNodes, ... keysSharp.childNodes];
    const result = pianoKeyAndSharpChildNodes.filter(node => node && node.hasAttribute && node.hasAttribute('data-letter') && node.hasAttribute('data-note'));
    result.map((element) => element.classList.add("piano-key-letter"));
}

function changeKeyNameToNotes(event) {
    event.target.classList.add("btn-active");
    document.getElementById("letters").classList.remove("btn-active");
    const pianoKey = document.getElementById("pianoBoard");

    const keysSharp = document.getElementById("pianoBoardSharp");
    const pianoKeyAndSharpChildNodes = [...pianoKey.childNodes, ... keysSharp.childNodes];
    const result = pianoKeyAndSharpChildNodes.filter(node => node && node.hasAttribute && node.hasAttribute('data-letter') && node.hasAttribute('data-note'));
    result.map((element) => element.classList.remove("piano-key-letter"));
}

function playAudioOnKeyDown(audio)  {
    audio.currentTime = 0;
    audio.play();
}

function playAudioKeyboardUp(event) {
    const {audioParent} = findAudioAndParent(event);
    audioParent.classList.remove('piano-key-active-keyboard');
    audioParent.classList.remove('piano-key-active-pseudo');
}

function playAudioKeyboardDown(event) {
    const {audio, audioParent} = findAudioAndParent(event);
    playAudioOnKeyDown(audio);
    audioParent.classList.add('piano-key-active-keyboard');
    audioParent.classList.add('piano-key-active-pseudo');
}

function findAudioAndParent(event) {
    const audioParent = document.getElementById(event.code);
    const audioParentChildNodes = [...audioParent.childNodes];
    return {
        audio: audioParentChildNodes.find((element) => element.tagName === "AUDIO"), 
        audioParent
    };
}

function playAudio(event) {
    const note = event.target.dataset.note;
    if (note) {
        const noteButtonChildNodes = [...event.target.childNodes];
        const audio = noteButtonChildNodes.find( element => element.tagName === "AUDIO");
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
}

function mouseDown(event) {
    mouseMoveTarget = event.target;
    event.target.classList.add('piano-key-active');
    piano.addEventListener('mousemove', mouseMove);
}

function mouseUp(event) {
    event.target.classList.remove('piano-key-active');
}

function mouseMove(event) {
    console.log(mouseMoveTarget);
    if (mouseMoveTarget !== event.target) {
        playAudio(event);
        mouseMoveTarget && mouseMoveTarget.classList && mouseMoveTarget.classList.remove('piano-key-active');
        mouseMoveTarget = event.target;
    }
    event.target.classList.add('piano-key-active');
}
document.addEventListener("onclick", () => {
    toggleFullscreen();
});

function getFullscreenElement() {
    return document.fullscreenElement;
}

function toggleFullscreen() {
    if (getFullscreenElement()) {
        document.exitFullscreen();
    } else {
        document.getElementById("toggleFullscreen").requestFullscreen().catch(console.log);
    }
}