import Progress from "./progress/progress.js"
import displayProgress from "./chart/chart.js"
import { typingTimer } from "./timer/timer.js"
import createTextDivs from "./text/index.js"
import { typingTest } from "./typing/typingHandler.js"

document.addEventListener("DOMContentLoaded", async function () {
  document.addEventListener('keydown', keydownFunctions)
  const progressData = JSON.parse(localStorage.getItem("userProgress"))
  const progressChart = document.querySelector("#progressChart")
  if (progressData){
    displayProgress(progressData, progressChart)
  }
  const pageElement = document.querySelector('body')
  wordTypingTest(pageElement)
//   const mainElement = document.querySelector('main')
  const restartButton = document.getElementById('restart')
  const resetButton = document.getElementById('reset')
  restartButton.addEventListener('click', () => {
    this.location.reload();
  })
  resetButton.addEventListener('click', reset)
})

async function wordTypingTest(pageElement) {
  const typingElement = pageElement.querySelector(".text")
  const progressElement = pageElement.querySelector("#progressChart")
  const timerElement = pageElement.querySelector("#timer")
  const textContent = await createTextDivs()
  typingElement.appendChild(textContent)

  const letterContainers = pageElement.querySelectorAll(".words")
  const textContainer = pageElement.querySelector('.textContainer')
  typingTest.init(textContainer)

  typingTimer.timerElement = timerElement
  typingTimer.showTimer()

  let typingTime = 60
  typingElement.setAttribute("tabindex", "0")
  typingElement.focus()

  pageElement.addEventListener("keydown", eventHandling(typingTime, progressElement))


}
function reset (event){
  typingTest.reset()
  typingTimer.reset()
}

function keydownFunctions(event){
    if (event.key === ' '){
    event.preventDefault();
    }else if (event.key === 'Enter' || event.keyCode === 13){
    location.reload();
  }else if (event.key === 'Escape'){
    reset(event)
  }
}

function eventHandling(seconds, chartElement) {
  return function (event) {
    if (!typingTimer.timerStarted) {
      typingTimer.startTimer(seconds)
      typingTest.enabled = true
      setTimeout(() => {
        finalizeTypingTest(chartElement)
        // typingTest.enabled = false
        // saveResults()
        // showResults(chartElement)
      }, seconds * 1000)
    }
    typingTest.handleKeydown(event)
  }
}

async function finalizeTypingTest (chartElement){
    typingTest.enabled = false
    const results = await retrieveResults();
    noticeProgress(results)
    saveResults(results)
    showResults(chartElement)
}

async function retrieveResults (){
    const correct = typingTest.correctLettersCount
    const total = typingTest.totalLettersCount
    if (correct && total){
        return {correct, total}
    }else{
        return {correct:0, total:0}
    }
}

async function saveResults(results) {
    try {
        // const results = await retrieveResults();
        const result = new Progress(results.correct, results.total);
        result.save
    } catch (error) {
        console.error("Error while saving results:", error);
    }
}

function showResults(chartElement){
  const data = localStorage.getItem('userProgress')
  displayProgress(JSON.parse(data), chartElement)
}

function noticeProgress (results){
    const bestValues = getBestTestValues()
    const result = new Progress(results.correct, results.total);
    if (result.wpm > bestValues.maxWpm && result.accuracy > bestValues.maxAccuracy){
        alert(`
        New typing speed and accurasy record!
        Improved WPM from ${bestValues.maxWpm} to ${result.wpm}!
        Improved Accuracy from ${bestValues.maxAccuracy}% to ${result.accuracy}%!
        `)
        return
    } else if (result.wpm > bestValues.maxWpm){
        alert(`
        New typing speed record!
        Improved WPM from ${bestValues.maxWpm} to ${result.wpm}!
        `)
        return
    }else if (result.accuracy > bestValues.maxAccuracy){
        alert(`
        New accurasy record!
        Improved Accuracy from ${bestValues.maxAccuracy}% to ${result.accuracy}%!
        `)
        return
    }else{
        alert(`
        Your typing speed is ${result.wpm} WPM!
        Your accuracy is ${result.accuracy}%!
        `)
        return
    }
}

function getBestTestValues (){
let allData = JSON.parse(localStorage.getItem('userProgress'))
if (allData){
const maxWpm = allData.reduce((max, obj) => max.wpm > obj.wpm ? max : obj).wpm;
const maxAccuracy = allData.reduce((max, obj) => max.accuracy > obj.accuracy ? max : obj).accuracy;
return {maxWpm, maxAccuracy}
}else{
    return {maxWpm:0, maxAccuracy:0}
}
}



// [{wpm: 15, accuracy: 86, date: "2024-4-31 22:4:4"}, {wpm: 19, accuracy: 73, date: "2024-4-31 22:7:51"},…]
// 0
// : 
// {wpm: 15, accuracy: 86, date: "2024-4-31 22:4:4"}
// 1
// : 
// {wpm: 19, accuracy: 73, date: "2024-4-31 22:7:51"}
// 2
// : 
// {wpm: 26, accuracy: 55, date: "2024-4-31 22:8:52"}
// 3
// : 
// {wpm: 21, accuracy: 98, date: "2024-4-31 22:11:25"}
// 4
// : 
// {wpm: 26, accuracy: 87, date: "2024-4-31 22:14:25"}
// 5
// : 
// {wpm: 22, accuracy: 90, date: "2024-4-31 22:27:47"}
// 6
// : 
// {wpm: 20, accuracy: 81, date: "2024-4-31 22:30:54"}
// 7
// : 
// {wpm: 3, accuracy: 5, date: "2024-4-31 22:35:25"}
// 8
// : 
// {wpm: 0, accuracy: null, date: "2024-5-1 13:5:5"}