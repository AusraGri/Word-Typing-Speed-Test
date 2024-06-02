import { typingTest } from "../typing/typingHandler.js"
import Progress from "./progress.js"
import displayProgress from "../chart/chart.js"

export { retrieveResults, saveResults, showResults }

async function retrieveResults() {
  const correct = typingTest.correctLettersCount
  const total = typingTest.totalLettersCount
  if (correct && total) {
    return { correct, total }
  } else {
    return { correct: 0, total: 0 }
  }
}

function saveResults(results) {
  try {
    const result = new Progress(results.correct, results.total)
    if (result.wpm > 0) {
      result.save
    }
  } catch (error) {
    console.error("Error while saving results:", error)
  }
}

function showResults(chartElement) {
  const data = localStorage.getItem("userProgress")
  displayProgress(JSON.parse(data), chartElement)
}
