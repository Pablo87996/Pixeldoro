const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const buttonStart = document.getElementById("button-start");
const buttonStop = document.getElementById("button-stop");
const buttonPomodoro = document.getElementById("button-pomodoro");
const buttonShortBreak = document.getElementById("button-short-break");
const buttonLongBreak = document.getElementById("button-long-break");
const startBreak = document.getElementById("start-break");
const buttonSettings = document.getElementById('button-settings');
const settings = document.getElementById('settings');
const blur = document.getElementById('blur');
const popUp = document.getElementById('pop-up');
const buttonClose = document.getElementById('button-close');
const buttonClose3 = document.getElementById('button-close-3');
const pomodoroTime = document.getElementById('pomodoro-time');
const shortBreakTime = document.getElementById('short-break-time');
const longBreakTime = document.getElementById('long-break-time');
const notification = document.getElementById('notification');
const lofi = document.getElementById('lo-fi');
const messagePopUp = document.querySelector('.message-pop-up');
let option = 0;
let pomodoros = 0;
let timerWorking = false;
let tmpTimes = null;
let timeRemaining = null;
let minutes = 25;
let seconds = 0;

pomodoroTime.value = 25;
shortBreakTime.value = 5;
longBreakTime.value = 15;

const worker = new Worker('./js/worker.js');

worker.onmessage = (e) => {
    let data = e.data;

    timerWorking = data.working;
    updateTimer(e.data);
}

//Buttons
buttonStart.onclick = function () {
    worker.postMessage('start');
    buttonStart.classList.add('blocked');
}

buttonStop.onclick = function () {
    worker.postMessage('stop');
    buttonStart.classList.remove('blocked');
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

buttonClose3.onclick = () => {
    messagePopUp.classList.remove('active');
    blur.classList.remove('active');
}

startBreak.onclick = () => {
    messagePopUp.classList.remove('active');
    blur.classList.remove('active');

    buttonStart.onclick();
}

function updateTimer(data) {
    let {time, timeIsOver} = data;

    try{
        display(time.getMinutes(), time.getSeconds());
    }catch(error){
        display(minutes, seconds);
    }

    function display(min, s) {
        if (s <= 9) {
            displaySeconds.innerHTML = "0" + s;
        }
    
        if (s > 9) {
            displaySeconds.innerHTML = s;
        }
    
        if (min > 9) {
            displayMinutes.innerHTML = min;
        }
    
        if (min <= 9) {
            displayMinutes.innerHTML = "0" + min;
        }
    }

    if (timeIsOver) {
        notification.play();
        
        if (option == 0 && pomodoros < 3) {
            buttonShortBreak.onclick();
            pomodoros++;
            messagePopUp.classList.add('active');
            blur.classList.add('active');
        } else if (option == 0 && pomodoros == 3) {
            buttonLongBreak.onclick();
            pomodoros = 0;
            messagePopUp.classList.add('active');
            blur.classList.add('active');
        } else {
            buttonPomodoro.onclick();
        }
    }
}

// Switch between Pomodoro, short break and long break.
function switchMode(option) {
    buttonStart.classList.remove('blocked');

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

    let postData = {
        msg: 'switchMode',
        minutes: minutes
    }

    worker.postMessage(postData);
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
            worker.postMessage('stop');

            if (confirm('Your timer is running, would you like to switch it?')) {
                switchMode(option);
                return true;
            } else {
                worker.postMessage('start');
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
