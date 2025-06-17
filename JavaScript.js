let timer = null;
let min = 25;
let sec = 0;
let isRunning = false
let completedTimes = 0
let duplicateMin = 0
let breakChecker = false
const timeShow = document.getElementById("timeShow")
const remark = document.getElementById("remark")
const work = document.getElementById("work")
const completedPomo = document.getElementById("completed")
const audio = document.getElementById("audio")
const buzzer = document.getElementById("buzzer")
let breaks = false
/* ----------- ShortBreak Function----------- */
function shortBreak(){
     min = 5;
     showWorkType(duplicateMin = min , "break")
     sec = 0;
     breaks = true
     start() 
}


/* ----------- LongBreak Function----------- */
function longBreak(){
    min = 10;
    showWorkType(duplicateMin = min , "break")
    sec = 0;
    breaks = true
    start()
}

/* ----------- Time Run Function----------- */
function start(){
if(!isRunning){
    timer = setInterval(update , 1000)
    isRunning = true
    breakChecker = false;
    showWorkType(duplicateMin = min , "pomodoro")
}

}

/* ----------- Stop Function----------- */
function stop(){
    if(isRunning){
        clearInterval(timer)
        isRunning = false
    }
}

/* ----------- reset Function----------- */
function reset(){
       clearInterval(timer)
        timer = null;
        min = 25;
        duplicateMin = min
        sec = 0;
        isRunning = false
        timeShow.textContent = (`25:00`)
        work.textContent = "Stay focused, one Pomodoro at a time."
        breakChecker = false
}

/* ----------- Time Update Function----------- */
function update(){
    if(min === 0 && sec === 0){
        buzzer.play()
        clearInterval(timer)
        timeShow.style.color = "black"
        console.log("completed")
        isRunning = false
        min = 25
        sec = 0
        duplicateMin = min
        if (breakChecker === false && breaks === false){
            completedPomodoro()
        }
        
        return;
    }

    if(sec === 0){
        sec = 59;
        min = min - 1;
    }
    else{
        sec = sec -1 ;
    }
    let displayMin = String(min).padStart(2,"0")
    let displaySec = String(sec).padStart(2,"0")

    if(min === 0 && sec <= 5){
        timeShow.style.color = "red"
        
        audio.play()
    }
    else{
        timeShow.style.color = "black";
    }

    timeShow.textContent = (`${displayMin}:${displaySec}`)

}


/* ----------- Work Type Description Function----------- */
function showWorkType(duplicateMin , BreakChecker){
    if(BreakChecker == "break"){
        breakChecker = true
    }
    if(duplicateMin > 20){
        work.textContent = "Work Hard 🔥"
    }
    else if(duplicateMin  > 8) {
        work.textContent = "Long - Break 🧘"
    }
    else{
        work.textContent = "Short - Break 😊"
    }
}

/* ----------- It will Check No.of Pomodoros completed ----------- */
function completedPomodoro(){
        completedTimes+=1
        completedPomo.textContent = `${completedTimes}`
        completedPomo.style.fontSize = "20px" ;
        completedPomo.style.fontWeight = "bold";
        if(completedTimes % 4 == 0){
            longBreak()
        }
        else{
            shortBreak()
        }
}