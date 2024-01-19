let countdownInterval;
let targetTime;
let previousDuration;
let isPaused = false;

document.addEventListener('DOMContentLoaded', function(){
    resetTimer();
});

function startTimer() {
    const durationInput = document.getElementById("duration");
    const duration = parseInt(durationInput.value, 10);

    if(!isNaN(duration) && duration > 0){
        if(isPaused){
            targetTime = new Date().getTime() + (duration * 60 * 1000 - (previousDuration * 60 * 1000));
        }
        else{
            targetTime = new Date().getTime() + duration * 60 * 1000;
            previousDuration = duration;
        }

        countdownInterval = setInterval(updateCountdown, 1000);
        toggleButtons(true);
    }
}

function pauseTimer(){
    clearInterval(countdownInterval);
    toggleButtons(false);
    document.getElementById("startButton").style.display = "none";
    document.getElementById("playButton").style.display = "inline-block";
    document.getElementById("replayButton").style.display = "inline-block";
    document.getElementById("resetButton").style.display = "inline-block";
}

function playTimer(){
    startTimer();
    document.getElementById("resetButton").style.display = "inline-block";
    document.getElementById("replayButton").style.display = "none";
}

function stopTimer(){
    clearInterval(countdownInterval);
    toggleButtons(false);
    document.getElementById("startButton").style.display = "none";
    document.getElementById("replayButton").style.display = "inline-block";
    document.getElementById("stopButton").style.display = "none";
    document.getElementById("resetButton").style.display = "inline-block";
}

function resetTimer(){
    clearInterval(countdownInterval);
    targetTime = null;
    isPaused = false;
    document.getElementById("duration").value = "";
    updateCountdown();
    toggleButtons(false);
    document.getElementById("startButton").style.display = "inline-block";
}

function replayTimer(){
    document.getElementById("duration").value = previousDuration;
    startTimer();
}

function updateCountdown(){
    if(targetTime){
        const now = new Date().getTime();
        const distance = targetTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = formatTime(days);
        document.getElementById("hours").innerHTML = formatTime(hours);
        document.getElementById("minutes").innerHTML = formatTime(minutes);
        document.getElementById("seconds").innerHTML = formatTime(seconds);

        if(distance < 0){
            clearInterval(countdownInterval);
            document.getElementById("countdown-message").innerHTML = "Time's up!";
            toggleButtons(false);
            document.getElementById("startButton").style.display = "none";
            document.getElementById("replayButton").style.display = "none";
        }
    }
    else{
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}

function formatTime(time){
    return time < 10 ? "0" + time : time;
}

function toggleButtons(running) {
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");
    const replayButton = document.getElementById("replayButton");
    const resetButton = document.getElementById("resetButton");

    startButton.style.display = !running ? "inline-block" : "none";
    pauseButton.style.display = running && !isPaused ? "inline-block" : "none";
    playButton.style.display = isPaused ? "inline-block" : "none";
    stopButton.style.display = running && !isPaused ? "inline-block" : "none";
    replayButton.style.display = isPaused ?  "inline-block" : "none";
    resetButton.style.display = running && !isPaused ? "inline-block" : "none";
}