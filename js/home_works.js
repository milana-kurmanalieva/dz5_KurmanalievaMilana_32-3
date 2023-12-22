const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^\w[a-z0-9._-]+@gmail.com$/i
const enter = ()=>{
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'Good'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'Wrong'
        gmailResult.style.color = 'red'
    }
}
gmailButton.onclick = () => enter()
window.onkeydown = (event)=>{
    if (event.code === 'Enter'){
        enter()
    }
}


const child = document.querySelector('.child_block')
// const parentBlock = document.querySelector('.parent_block')
let positionX = 0
let positionY = 0
let widthBlock = 448

const animateIn = ()=> {
    child.style.left = `${positionX}px`
    child.style.top = `${positionY}px`
    if (positionX < widthBlock && positionY === 0){
        positionX++
        setTimeout(animateIn , 4)
    }else if (positionX === widthBlock && positionY < widthBlock){
        positionY++
        setTimeout(animateIn, 4)
    }else if ( positionY === widthBlock && positionX !== 0){
        positionX--
        setTimeout(animateIn, 4)
    }else if (positionX === 0 && positionY !== 0){
        positionY--
        setTimeout(animateIn, 4)
    }
}
animateIn()

//Home work 2 part 2
const btnStart = document.getElementById('start')
const btnStop = document.getElementById('stop')
const btnReset = document.getElementById('reset')
const timeBlock = document.getElementById('secondsS')

let timerInterval
let timerRunning = false
let counter = 0


const updateTimer = () => {
    counter++
    timeBlock.textContent = counter
}
const startTimer = ()=> {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true
    }
}
btnStart.onclick = startTimer

const stopTimer = ()=> {
    clearInterval(timerInterval)
    timerRunning = false
}
btnStop.onclick = stopTimer
const resetTimer = () => {
    clearInterval(timerInterval)
    counter = 0
    timeBlock.textContent = counter
    timerRunning = false
}
btnReset.onclick = resetTimer