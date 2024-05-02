let timer; // Variable to hold the timer interval
let startTime; // Variable to hold the start time
let isRunning = false; // Flag to indicate if stopwatch is running
let laps = []; // Array to hold lap times

const display = document.querySelector('.display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
    let date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = isRunning ? currentTime - startTime : 0;
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((a, b) => a + b, 0) : 0);
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    display.textContent = '00:00:00';
    laps = [];
    lapsList.innerHTML = '';
}

function lapTimer() {
    if (isRunning) {
        const currentTime = Date.now();
        const lapTime = currentTime - startTime - laps.reduce((a, b) => a + b, 0);
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapsList.appendChild(lapItem);
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stopwatch</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="stopwatch">
        <div class="display">00:00:00</div>
        <div class="controls">
            <button id="start">Start</button>
            <button id="pause">Pause</button>
            <button id="reset">Reset</button>
            <button id="lap">Lap</button>
        </div>
        <ul class="laps"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
