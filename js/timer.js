var minutes = 25;
var seconds = 0;
var displayMinutes = document.getElementById("minutes");
var displaySeconds = document.getElementById("seconds");
var buttonStart = document.getElementById("button-start");
var buttonStop = document.getElementById("button-stop");
var buttonPomodoro = document.getElementById("button-pomodoro");
var buttonShortBreak = document.getElementById("button-short-break");
var buttonLongBreak = document.getElementById("button-long-break");
var buttonSettings = document.getElementById('button-settings');
var blur = document.getElementById('blur');
var popUp = document.getElementById('pop-up');
var buttonClose = document.getElementById('button-close');
var pomodoroTime = document.getElementById('pomodoro-time');
var shortBreakTime = document.getElementById('short-break-time');
var longBreakTime = document.getElementById('long-break-time');
const empty = document.getElementById('empty');
const notification = document.getElementById('notification');
const lofi = document.getElementById('lo-fi');
var interval;
var option = 0;
var pomodors = 0;
pomodoroTime.value = 25;
shortBreakTime.value = 5;
longBreakTime.value = 15;

//Buttons
buttonStart.onclick = function() {
    clearInterval(interval);
    interval = setInterval(startTimer, 1000);
}

buttonStop.onclick = function() {
    clearInterval(interval);
    empty.pause();
}

buttonPomodoro.onclick = function() {
    clearInterval(interval);
    empty.pause();
    option = 0;
    minutes = pomodoroTime.value;
    seconds = 0;
    if(minutes < 10) {
        displayMinutes.innerHTML = "0" + minutes;
    } else {
        displayMinutes.innerHTML = minutes;
    }
    displaySeconds.innerHTML = "0" + seconds;
}

buttonShortBreak.onclick = function() {
    clearInterval(interval);
    empty.pause();
    option = 1;
    minutes = shortBreakTime.value;
    seconds = 0;
    if(minutes < 10) {
        displayMinutes.innerHTML = "0" + minutes;
    } else {
        displayMinutes.innerHTML = minutes;
    }
    displaySeconds.innerHTML = "0" + seconds;
}

buttonLongBreak.onclick = function() {
    clearInterval(interval);
    empty.pause();
    option = 2;
    minutes = longBreakTime.value;
    seconds = 0;
    if(minutes < 10) {
        displayMinutes.innerHTML = "0" + minutes;
    } else {
        displayMinutes.innerHTML = minutes;
    }
    displaySeconds.innerHTML = "0" + seconds;
}

//Settings
// buttonSettings.onclick = function() {
//     blur.classList.toggle('active');
//     popUp.classList.toggle('active');   
// }

buttonClose.onclick = function() {
    if(pomodoroTime.value > 0 && shortBreakTime.value > 0 && longBreakTime.value > 0 && pomodoroTime.value < 60 && shortBreakTime.value < 60 && longBreakTime.value < 60){
        blur.classList.toggle('active');
        popUp.classList.toggle('active');
    }else{
        alert("Value must be less than or equal to 59.");
    }
}

pomodoroTime.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        if(pomodoroTime.value > 0 && pomodoroTime.value < 60){
            clearInterval(interval);
            minutes = pomodoroTime.value;
            seconds = 0;
            if(minutes < 10) {
                displayMinutes.innerHTML = "0" + minutes;
            } else {
                displayMinutes.innerHTML = minutes;
            }
            displaySeconds.innerHTML = "0" + seconds;
            buttonClose.onclick();
        }else{
            alert("Value must be less than or equal to 59.");
        }
    }
});

shortBreakTime.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        if(shortBreakTime.value > 0 && shortBreakTime.value < 60){
            clearInterval(interval);
            minutes = shortBreakTime.value;
            seconds = 0;
            if(minutes < 10) {
                displayMinutes.innerHTML = "0" + minutes;
            } else {
                displayMinutes.innerHTML = minutes;
            }
            displaySeconds.innerHTML = "0" + seconds;
            buttonClose.onclick();
        }else{
            alert("Value must be less than or equal to 59.");
        }
    }
});

longBreakTime.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        if(longBreakTime.value > 0 && longBreakTime.value < 60){
            clearInterval(interval);
            minutes = longBreakTime.value;
            seconds = 0;
            if(minutes < 10) {
                displayMinutes.innerHTML = "0" + minutes;
            } else {
                displayMinutes.innerHTML = minutes;
            }
            displaySeconds.innerHTML = "0" + seconds;
            buttonClose.onclick();
        }else{
            alert("Value must be less than or equal to 59.");
        }
    }
});

//Function startTimer.

function startTimer() {
    empty.play();
    seconds--;
    
    if(seconds <= 9) {
        displaySeconds.innerHTML = "0" + seconds;
    }

    if(seconds > 9) {
        displaySeconds.innerHTML = seconds;
    }

    if(seconds < 0){
        minutes--;
        displayMinutes.innerHTML = minutes;
        seconds = 59;
        displaySeconds.innerHTML = seconds;
    }

    if(minutes <= 9) {
        displayMinutes.innerHTML = "0" + minutes;
    }

    if(minutes < 0 && seconds == 59) {
        notification.play();
        if(option == 0 && pomodors < 3){
            buttonShortBreak.onclick();
            pomodors++;
        }else if(option == 0 && pomodors == 3) {
            buttonLongBreak.onclick();
            pomodors = 0;
        }else {
            buttonPomodoro.onclick();
        }
    }
}

