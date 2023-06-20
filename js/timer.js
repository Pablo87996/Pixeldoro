let minutes = 25;
let seconds = 0;
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const buttonStart = document.getElementById("button-start");
const buttonStop = document.getElementById("button-stop");
const buttonPomodoro = document.getElementById("button-pomodoro");
const buttonShortBreak = document.getElementById("button-short-break");
const buttonLongBreak = document.getElementById("button-long-break");
const buttonSettings = document.getElementById('button-settings');
const settings = document.getElementById('settings');
const blur = document.getElementById('blur');
const popUp = document.getElementById('pop-up');
const buttonClose = document.getElementById('button-close');
const pomodoroTime = document.getElementById('pomodoro-time');
const shortBreakTime = document.getElementById('short-break-time');
const longBreakTime = document.getElementById('long-break-time');
const notification = document.getElementById('notification');
const lofi = document.getElementById('lo-fi');
let interval;
let option = 0;
let pomodoros = 0;
let timerWorking = false;
let tmpTimes = null;
let date;
let timeRemaining = null;
let endTime;

pomodoroTime.value = 25;
shortBreakTime.value = 5;
longBreakTime.value = 15;

//Buttons
buttonStart.onclick = function () {
    clearInterval(interval);

    date = new Date();
    timeRemaining = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    date.setSeconds(date.getSeconds() + seconds);
    endTime = date;
    
    interval = setInterval(startTimer, 1000);
    buttonStart.classList.add('blocked');
    timerWorking = true;
}

buttonStop.onclick = function () {
    clearInterval(interval);
    minutes = timeRemaining.getMinutes();
    seconds = timeRemaining.getSeconds();
    buttonStart.classList.remove('blocked');
    timerWorking = false;
}

buttonPomodoro.onclick = function () {
    option = 0;
    confirmSwitchMode(option);
}

buttonShortBreak.onclick = function () {
    option = 1;
    confirmSwitchMode(option);
}

buttonLongBreak.onclick = function () {
    option = 2;
    confirmSwitchMode(option);
}

settings.onclick = function () {
    blur.classList.toggle('active');
    popUp.classList.toggle('active');
    let tmpTimes = [pomodoroTime.value, shortBreakTime.value, longBreakTime.value];

    buttonClose.onclick = function () {
        let isPositive = pomodoroTime.value > 0 && shortBreakTime.value > 0 && longBreakTime.value > 0;
        let isLessThanSixty = pomodoroTime.value < 60 && shortBreakTime.value < 60 && longBreakTime.value < 60;
        let isInteger = pomodoroTime.value % 1 === 0 && shortBreakTime.value % 1 === 0 && longBreakTime.value % 1 === 0;

        if (isInteger) {
            timesToInt();

            if (isPositive && isLessThanSixty) {
                if (tmpTimes[0] != pomodoroTime.value || tmpTimes[1] != shortBreakTime.value || tmpTimes[2] != longBreakTime.value) {
                    if (!confirmSwitchMode(0)) {
                        pomodoroTime.value = tmpTimes[0];
                        shortBreakTime.value = tmpTimes[1];
                        longBreakTime.value = tmpTimes[2];
                        tmpTimes = null;
                    }
                }

                blur.classList.toggle('active');
                popUp.classList.toggle('active');
            } else {
                alert("The values must be less than or equal to 59.");
            }
        } else {
            alert("The values must be integers.");
        }
    }
}

// Settings
pomodoroTime.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if (pomodoroTime.value > 0 && pomodoroTime.value < 60) {
            if (confirmSwitchMode(0)) {
                buttonClose.onclick();
            }
        } else {
            alert("The values must be less than or equal to 59.");
        }
    }
});

shortBreakTime.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if (shortBreakTime.value > 0 && shortBreakTime.value < 60) {
            if (confirmSwitchMode(0)) {
                buttonClose.onclick();
            }
        } else {
            alert("The values must be less than or equal to 59.");
        }
    }
});

longBreakTime.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if (longBreakTime.value > 0 && longBreakTime.value < 60) {
            if (confirmSwitchMode(0)) {
                buttonClose.onclick();
            }
        } else {
            alert("The values must be less than or equal to 59.");
        }
    }
});

//Function startTimer.
function startTimer() {
    if(!(timeRemaining.setHours(endTime.getHours() - new Date().getHours()) == 0 && timeRemaining.setMinutes(endTime.getMinutes() - new Date().getMinutes()) == 0 && timeRemaining.setSeconds(endTime.getSeconds() - new Date().getSeconds()) == 0)){
        timeRemaining.setHours(endTime.getHours() - new Date().getHours());
        timeRemaining.setMinutes(endTime.getMinutes() - new Date().getMinutes());
        timeRemaining.setSeconds(endTime.getSeconds() - new Date().getSeconds());
    }
    
    if (timeRemaining.getSeconds() <= 9) {
        displaySeconds.innerHTML = "0" + timeRemaining.getSeconds();
    }
    
    if (timeRemaining.getSeconds() > 9) {
        displaySeconds.innerHTML = timeRemaining.getSeconds();
    }
    
    if (timeRemaining.getMinutes() > 9) {
        displayMinutes.innerHTML = timeRemaining.getMinutes();
    }
    
    if (timeRemaining.getMinutes() <= 9) {
        displayMinutes.innerHTML = "0" + timeRemaining.getMinutes();
    }

    if (timeRemaining.getHours() == 0 && timeRemaining.getMinutes() == 0 && timeRemaining.getSeconds() == 0) {
        timerWorking = false;
        notification.play();
        clearInterval(interval);
        
        if (option == 0 && pomodoros < 3) {
            buttonShortBreak.onclick();
            pomodoros++;
        } else if (option == 0 && pomodoros == 3) {
            buttonLongBreak.onclick();
            pomodoros = 0;
        } else {
            buttonPomodoro.onclick();
        }
    }
}

// Switch between Pomodoro, short break and long break.
function switchMode(option) {
    buttonStart.classList.remove('blocked');
    timerWorking = false;
    seconds = 0;

    try{
        timeRemaining.setSeconds(0);
    }catch(error){
        // pass
    }

    switch (option) {
        case 0:
            minutes = parseInt(pomodoroTime.value);
            break;
        case 1:
            minutes = parseInt(shortBreakTime.value);
            break;
        case 2:
            minutes = parseInt(longBreakTime.value);
        default:
            break;
    }

    if (minutes < 10) {
        displayMinutes.innerHTML = "0" + minutes;
    } else {
        displayMinutes.innerHTML = minutes;
    }

    try{
        displaySeconds.innerHTML = "0" + timeRemaining.getSeconds();
    }catch(error){
        // pass
    }
}

// Confirm the change between the modes (Pomodoro, short break and long break).
function confirmSwitchMode(option) {
    let isInteger = pomodoroTime.value % 1 === 0 && shortBreakTime.value % 1 === 0 && longBreakTime.value % 1 === 0;
    timesToInt();

    if (isInteger) {
        if (!timerWorking) {
            switchMode(option);
            return true;
        } else {
            clearInterval(interval);

            if (confirm('Your timer is running, would you like to switch it?')) {
                switchMode(option);
                return true;
            } else {
                interval = setInterval(startTimer, 1000);
                return false;
            }
        }
    } else {
        alert("The values must be integers.");
    }
}

// The numbers can be integers, but with decimal floats, like "25.0". So, converting the numbers to Integer, it can resolve some problems.
function timesToInt() {
    pomodoroTime.value = parseInt(pomodoroTime.value);
    shortBreakTime.value = parseInt(shortBreakTime.value);
    longBreakTime.value = parseInt(longBreakTime.value);
}
