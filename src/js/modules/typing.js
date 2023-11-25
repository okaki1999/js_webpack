const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title-time');
const timer = document.querySelector('#ty-timer');
const timeSelectEl = document.querySelector('.ty-time-select');
const typing = document.querySelector('#typing');
const backToStart = document.querySelector('#ty-back-to-start');
const resultContainer = document.querySelector('#ty-result-container');
const textarea = document.querySelector('#ty-textarea');

let timelimit = 30;
let remainingTime;
let isActive = false;
let isPlaying = false;
let intervalId = null;

timeSelectEl.addEventListener('change', () =>{
    timelimit = timeSelectEl.value;
})
window.addEventListener('keypress', e => {
    isActive = typing.classList.contains('active');

    if(e.key === 'Enter' && isActive && !isPlaying){
        start();
        isActive = false;
        isPlaying = true;
    }
    return;
})

function start(){
    startPage.classList.remove('show');
    typingGame.classList.add('show');
    titleTime.textContent = timelimit;
    remainingTime = timelimit;
    timer.textContent = remainingTime;
    textarea.focus();
    textarea.disabled = false;

    intervalId = setInterval(() => {
        remainingTime -= 1;
        timer.textContent = remainingTime;
        if(remainingTime <= 0){
            showResult();
        }
    }, 1000)
}

backToStart.addEventListener('click', () => {
    typingGame.classList.remove('show');
    startPage.classList.add('show');
    resultContainer.classList.remove('show');
    isPlaying = false;
})

function showResult(){
    textarea.disabled = true;
    clearTimeout(intervalId);
    setTimeout(() => {
        resultContainer.classList.add('show');
    }, 1000);
}