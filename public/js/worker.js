// let minutes = 25;
// let seconds = 0;
let interval;
let date;
let timeRemaining = new Date();
let endTime;

let data = {
    time: timeRemaining,
    working: false,
    timeIsOver: false
}

self.onmessage = (e) => {
    if(e.data.msg == 'start'){
        date = new Date();
        timeRemaining = new Date();

        date.setMinutes(date.getMinutes() + e.data.min);
        date.setSeconds(date.getSeconds() + e.data.s);

        endTime = date;
        working = true;

        interval = setInterval(startTimer, 1000);
    }else if(e.data == 'stop'){
        stopTimer();
    }else if(e.data.msg == 'switchMode'){
        switchMode(e.data.min);
    }
}

function startTimer() {
    timeRemaining.setHours(endTime.getHours() - new Date().getHours());
    timeRemaining.setMinutes(endTime.getMinutes() - new Date().getMinutes());
    timeRemaining.setSeconds(endTime.getSeconds() - new Date().getSeconds());

    data = {
        time: timeRemaining,
        working: true
    }

    if (endTime < new Date()) {
        data.working = false;
        data.timeIsOver = true;
        clearInterval(interval);

        self.postMessage(data);
        data.timeIsOver = false;
    }

    self.postMessage(data);
}

function stopTimer() {
    if(interval) {
        clearInterval(interval);
        minutes = timeRemaining.getMinutes();
        seconds = timeRemaining.getSeconds();
        data.working = false;
    
        self.postMessage(data);
    }
}

function switchMode(min) {
    if(interval) {
        clearInterval(interval);
    }

    minutes = min;
    seconds = 0;
    data.working = false;
    
    timeRemaining.setMinutes(min);
    timeRemaining.setSeconds(0);

    self.postMessage(data);
}
