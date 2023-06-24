let minutes = 25;
let seconds = 0;
let interval;
let date;
let timeRemaining = null;
let endTime;

let data = {
    time: timeRemaining,
    working: false,
    timeIsOver: false
}

self.onmessage = (e) => {
    if(e.data == 'start'){
        date = new Date();
        timeRemaining = new Date();

        date.setMinutes(date.getMinutes() + minutes);
        date.setSeconds(date.getSeconds() + seconds);

        endTime = date;
        working = true;

        interval = setInterval(startTimer, 1000);
    }else if(e.data == 'stop'){
        stopTimer();
    }else if(e.data.msg == 'switchMode'){
        switchMode(e.data.minutes);
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
    clearInterval(interval);
    minutes = timeRemaining.getMinutes();
    seconds = timeRemaining.getSeconds();
    data.working = false;

    self.postMessage(data);
}

function switchMode(min) {
    clearInterval(interval);
    minutes = min;
    seconds = 0;
    data.working = false;
    
    try{
        timeRemaining.setMinutes(min);
        timeRemaining.setSeconds(0);
    }catch(error){
        // pass
    }

    self.postMessage(data);
}
