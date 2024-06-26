import Progress from "./progress/progress.js"
import displayProgress from "./chart/chart.js"
import { timeCounter } from "./timer/timeCounter.js"
import createTextDivs from "./text/index.js"
import { typingTest } from "./typing/typingHandler.js"
import noticeProgress from "./progress/progressNotice.js"
import { alertMessage } from "./messages/alertMessages.js"
import {
  retrieveResults,
  saveResults,
  showResults,
} from "./progress/results.js"
import { scrollToHighlighted } from "./page/textScrolling.js"
import { typingTime } from "./timer/typingTime.js"

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", keydownFunctions)
  const progressData = JSON.parse(localStorage.getItem("userProgress"))
  const progressChart = document.querySelector("#progressChart")
  if (progressData) {
    displayProgress(progressData, progressChart)
  }
  const pageElement = document.querySelector("body")
  wordTypingTest(pageElement)
  const restartButton = document.getElementById("restart")
  const resetButton = document.getElementById("reset")
  restartButton.addEventListener("click", () => {
    this.location.reload()
  })
  resetButton.addEventListener("click", (event) => {
    reset()
    scrollToHighlighted(pageElement)
  })
})

// Initializes the typing text part: gets text from API, creates divs, adds listener
async function wordTypingTest(pageElement) {
  let time = 60
  const typingElement = pageElement.querySelector(".text")
  const alertElement = pageElement.querySelector("#alert")
  const chartElement = pageElement.querySelector("#progressChart")
  const timerElement = pageElement.querySelector("#timer")
  const textContent = await createTextDivs()
  typingElement.appendChild(textContent)
  alertMessage.init(alertElement)
  alertMessage.display("Start typing to begin the test!")

  const textContainer = pageElement.querySelector(".textContainer")
  typingTest.init(textContainer)

  timeCounter.timerElement = timerElement
  timeCounter.showTimer()

  pageElement.addEventListener(
    "keydown",
    eventHandling(time, chartElement, pageElement)
  )
}

function reset() {
  typingTime.clearTimeout()
  typingTest.reset()
  timeCounter.reset()
  alertMessage.display("Start typing to begin the test!")
}

function keydownFunctions(event) {
  if (event.key === " ") {
    event.preventDefault()
  } else if (event.key === "Enter" || event.keyCode === 13) {
    location.reload()
  } else if (event.key === "Escape") {
    reset(event)
  }
}

function currentTypingValues() {
  let current = new Progress(
    typingTest.correctLettersCount,
    typingTest.totalLettersCount
  )
  let wpm = current.wpm
  let accuracy = current.accuracy
  return { wpm, accuracy }
}

function displayCurrentTypingValues(wpm, accuracy) {
  let message = `${wpm} WPM | ${accuracy}% accuracy`
  alertMessage.display(message)
}

function eventHandling(seconds, chartElement, pageElement) {
  return function (event) {
    if (typingTest.enabled) {
      const values = currentTypingValues()
      displayCurrentTypingValues(values.wpm, values.accuracy)
    }
    if (!timeCounter.timerStarted) {
      timeCounter.startTimer(seconds)
      typingTest.enabled = true
      typingTime.setTimeout(seconds, () => finalizeTypingTest(chartElement))
    }
    scrollToHighlighted(pageElement)
    typingTest.handleKeydown(event)
  }
}

//funtion that runs after typing test time has ended: progress notice, save and results in chart
async function finalizeTypingTest(chartElement) {
  typingTest.enabled = false
  const results = await retrieveResults()
  const note = noticeProgress(results)
  alertMessage.display(note)
  saveResults(results)
  showResults(chartElement)
}
