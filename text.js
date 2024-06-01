import { Progress } from "./progress.js"
import { displayProgress } from "./table.js"

document.addEventListener("DOMContentLoaded", async function () {
  const progressData = JSON.parse(localStorage.getItem("userProgress"))
  console.log(progressData)
  const progressChart = document.querySelector("#progressChart")

  const pageElement = document.querySelector("body")
  wordTypingTest2(pageElement)
})

async function wordTypingTest2(pageElement) {
  const typingElement = pageElement.querySelector(".text")
  const progressElement = pageElement.querySelector("#progressChart")
  const timerElement = pageElement.querySelector("#timer")
  await createTextContent(typingElement)

  const letterContainers = pageElement.querySelectorAll(".words")
  typingTest.init(letterContainers)

  typingTimer.timerElement = timerElement
  typingTimer.showTimer()

  let typingTime = 60
  typingElement.setAttribute("tabindex", "0")
  typingElement.focus()

  typingElement.addEventListener("keydown", eventHandling(typingTime, progressElement))


  // typingElement
  // .addEventListener('keydown', eventHandling(typingTime))

  // typingElement
  // .addEventListener("keydown", (event) => {
  //   try{
  //     typingTimer.startTimer(typingTime);
  //     if (typingTimer.counting) {
  //       typingTest.enabled = true;
  //       typingTest.handleKeydown(event);
  //     } else if (!typingTimer.counting) {
  //       typingTest.enabled = false;
  //     }
  //   }catch(error){
  //     console.log(error)
  //   }
  // })
}

function eventHandling(seconds, chartElement) {
  return function (event) {
    if (!typingTimer.timerStarted) {
      typingTimer.startTimer(seconds)
      typingTest.enabled = true
      setTimeout(() => {
        // typingTimer.timerStarted = false
        typingTest.enabled = false
        console.log("Time is 0")
        saveResults()
        showMustGoOn(chartElement)
      }, seconds * 1000)
    }
    typingTest.handleKeydown(event)
  }
}

function saveResults() {
  let correctLetters, totalLetters
  correctLetters = typingTest.correctLettersCount
  totalLetters = typingTest.totalLettersCount
  console.log(correctLetters, totalLetters)
  const result = new Progress(correctLetters, totalLetters)
  result.save
}

function showMustGoOn(chartElement){
  const data = localStorage.getItem('userProgress')
  displayProgress(JSON.parse(data), chartElement)
}

async function showChart (chartElement){
  let dataPromise = new Promise (function(resolve){
    const resultData =  localStorage.getItem('userProgress')
    if (resultData){
      resolve(JSON.parse(resultData))
    }
  })
  const data = await dataPromise
  displayProgress(data, progressElement)
}


//when counter gets to zero resolve
//ON FIRST KEY START TIMER
//await THEN HANDLE THE KEYS
// await WHEN TIMER IS OVER RETRIEVE VALUES AND SAVE PROGRES
//DISPLAY PROGRESS

async function createTextContent(textElement) {
  const textWords = await getText()
  const textStructure = createTextStructure(textWords)
  textElement.appendChild(textStructure)
}

const typingTimer = {
  counting: false,
  seconds: 0,
  timerElement: null,
  intervalId: null,
  timerStarted: false,
  startTimer: function (s = 60) {
    if (!this.timerStarted) {
      this.enableTimer(s)
      this.timerStarted = true // Set the flag to true so the timer starts only once
    }
  },

  enableTimer: function (s = 60) {
    this.seconds = s
    this.counting = true
    this.setTimer()
  },

  counter: function () {
    this.seconds--
    this.showTimer()
    if (this.seconds <= 0) {
      this.counting = false
      clearInterval(this.intervalId)
    }
  },

  setTimer: function () {
    this.showTimer()
    this.intervalId = setInterval(() => {
      if (this.counting) {
        this.counter()
      }
    }, 1000)
  },

  showTimer: function () {
    if (this.timerElement) {
      this.timerElement.innerText = this.seconds
    }
  },
}
const typingTest = {
  enabled: false,
  wordContainers: null,
  currentWordIndex: 0,
  currentLetterIndex: 0,
  correctLettersCount: 0,
  incorrectLettersCount: 0,
  totalLettersCount: 0,

  init: function (wordContainers) {
    this.wordContainers = wordContainers
    this.reset()
    this.highlightCurrentLetter()
  },

  handleKeydown: function (event) {
    if (this.enabled) {
      this.onKeydownEvent(event)
    } else if (!this.enabled) {
      console.log("key handler is not enabled")
    }
  },

  getLetterDivs: function (wordIndex) {
    return this.wordContainers[wordIndex].querySelectorAll(".letters")
  },

  moveToNextLetter: function () {
    const letterDivs = this.getLetterDivs(this.currentWordIndex)
    this.currentLetterIndex++
    this.highlightCurrentLetter()
    if (this.currentLetterIndex >= letterDivs.length) {
      this.evaluateWord(this.currentWordIndex)
      this.currentLetterIndex = 0
      this.currentWordIndex++
      this.highlightCurrentLetter()
    }
  },

  highlightCurrentLetter: function () {
    const letterDivs = this.getLetterDivs(this.currentWordIndex)
    letterDivs.forEach((div, index) => {
      // console.log(`current index value ${index}`)
      // console.log(`current letter index value ${this.currentLetterIndex}`)
      if (index === this.currentLetterIndex) {
        div.classList.add("highlight")
      } else {
        div.classList.remove("highlight")
      }
    })
    // console.log("break")
  },

  moveToPreviousLetter: function () {
    if (this.currentLetterIndex > 0) {
      this.currentLetterIndex--
    } else if (this.currentWordIndex > 0) {
      this.currentWordIndex--
      const previousLetterDivs = this.getLetterDivs(this.currentWordIndex)
      this.currentLetterIndex = previousLetterDivs.length - 1
    }
    const letterDivs = this.getLetterDivs(this.currentWordIndex)
    letterDivs[this.currentLetterIndex].classList.remove(
      "correct",
      "incorrect",
      "highlight"
    )
    this.highlightCurrentLetter()
  },

  onKeydownEvent: function (event) {
    console.log(this.correctLettersCount)
    if (this.currentWordIndex < this.wordContainers.length) {
      const letterDivs = this.getLetterDivs(this.currentWordIndex)
      const currentLetterDiv = letterDivs[this.currentLetterIndex]
      const currentLetter = currentLetterDiv.textContent
      const ignoredKeys = [
        "Shift",
        "Control",
        "Alt",
        "Meta",
        "Tab",
        "CapsLock",
        "Escape",
      ]

      if (ignoredKeys.includes(event.key)) {
        return
      }

      if (event.key === "Backspace") {
        currentLetterDiv.classList.remove("correct", "incorrect")
        this.moveToPreviousLetter()
        if (this.currentWordIndex === 0 && this.currentLetterIndex === 0) {
          alert("can't go back further")
        }
      } else if (event.key === " " && currentLetter === "\u00A0") {
        currentLetterDiv.classList.add("correct")
        currentLetterDiv.classList.remove("incorrect")
        this.moveToNextLetter()
      } else if (event.key === currentLetter.trim()) {
        currentLetterDiv.classList.add("correct")
        currentLetterDiv.classList.remove("incorrect")
        this.moveToNextLetter()
      } else {
        currentLetterDiv.classList.add("incorrect")
        currentLetterDiv.classList.remove("correct")
        this.moveToNextLetter()
      }
    }
  },

  evaluateWord: function (wordIndex) {
    const letterDivs = this.getLetterDivs(wordIndex)
    let correctLettersCount = 0

    letterDivs.forEach((letterDiv) => {
      if (letterDiv.classList.contains("correct")) {
        correctLettersCount++
      }
    })

    this.totalLettersCount += letterDivs.length
    this.correctLettersCount += correctLettersCount
    this.incorrectLettersCount += letterDivs.length - correctLettersCount
  },

  reset: function () {
    this.currentWordIndex = 0
    this.currentLetterIndex = 0
    this.correctLettersCount = 0
    this.incorrectLettersCount = 0
    this.totalLettersCount = 0
  },
}

/*
get the text from API
*/
async function getText() {
  try {
    const response = await fetch("https://poetrydb.org/linecount/14/lines")
    const poemLines = await response.json()
    const textSentences = poemLines[0].lines
    const words = wordLines(textSentences)
    return words
  } catch (error) {
    console.error(`ERROR: ${error}`)
  }
}

// split array of sentences into array of array words [[word, word1], [word, word2, word3]]
function wordLines(textArray) {
  const len = textArray.length
  return textArray.map((array) => {
    for (let i = 0; i < len; i++) {
      let newText = array
        .split(/(\s+)/)
        .map((part, index, array) => {
          if (index % 2 === 0 && index + 1 < array.length) {
            return part + array[index + 1]
          } else if (index % 2 === 0) {
            return part
          } else {
            return null
          }
        })
        .filter((part) => part !== null)
      return letters(newText)
    }
  })
}
// split words into letters
function letters(wordsArray) {
  return wordsArray.map((word) => {
    const words = []
    for (let letter of word) {
      words.push(letter)
    }
    return words
  })
}

function createDivWithClass(className) {
  const div = document.createElement("div")
  div.className = className
  return div
}

// Function to create the structure of divs from the nested text array
function createTextStructure(arr) {
  const textContainer = createDivWithClass("textContainer")

  arr.forEach((sentence) => {
    const sentenceDiv = createDivWithClass("sentence")
    textContainer.appendChild(sentenceDiv)

    sentence.forEach((word) => {
      const wordDiv = createDivWithClass("words")
      sentenceDiv.appendChild(wordDiv)

      word.forEach((letter) => {
        const letterDiv = createDivWithClass("letters")
        if (letter !== " ") {
          letterDiv.textContent = letter
        } else {
          letterDiv.innerHTML = "&nbsp"
        }
        wordDiv.appendChild(letterDiv)
      })
    })
  })

  return textContainer
}

let wordbasic = [
  ["H", "e", " "],
  ["h", "e", "l", "d", " "],
  ["n", "o", " "],
  ["d", "r", "e", "a", "m", " "],
  ["w", "o", "r", "t", "h", " "],
  ["w", "a", "k", "i", "n", "g", ";", " "],
  ["s", "o", " "],
  ["h", "e", " "],
  ["s", "a", "i", "d", ","],
]

let basic = [
  [
    ["H", "e", " "],
    ["h", "e", "l", "d", " "],
    ["n", "o", " "],
    ["d", "r", "e", "a", "m", " "],
    ["w", "o", "r", "t", "h", " "],
    ["w", "a", "k", "i", "n", "g", ";", " "],
    ["s", "o", " "],
    ["h", "e", " "],
    ["s", "a", "i", "d", ","],
  ],
  [
    ["H", "e", " "],
    ["w", "h", "o", " "],
    ["s", "t", "a", "n", "d", "s", " "],
    ["n", "o", "w", " "],
    ["o", "n", " "],
    ["d", "e", "a", "t", "h", "'", "s", " "],
    ["t", "r", "i", "u", "m", "p", "h", "a", "l", " "],
    ["s", "t", "e", "e", "p", ","],
  ],
  [
    ["A", "w", "a", "k", "e", "n", "e", "d", " "],
    ["o", "u", "t", " "],
    ["o", "f", " "],
    ["l", "i", "f", "e", " "],
    ["w", "h", "e", "r", "e", "i", "n", " "],
    ["w", "e", " "],
    ["s", "l", "e", "e", "p"],
  ],
  [
    ["A", "n", "d", " "],
    ["d", "r", "e", "a", "m", " "],
    ["o", "f", " "],
    ["w", "h", "a", "t", " "],
    ["h", "e", " "],
    ["k", "n", "o", "w", "s", " "],
    ["a", "n", "d", " "],
    ["s", "e", "e", "s", ",", " "],
    ["b", "e", "i", "n", "g", " "],
    ["d", "e", "a", "d", "."],
  ],
  [
    ["B", "u", "t", " "],
    ["n", "e", "v", "e", "r", " "],
    ["d", "e", "a", "t", "h", " "],
    ["f", "o", "r", " "],
    ["h", "i", "m", " "],
    ["w", "a", "s", " "],
    ["d", "a", "r", "k", " "],
    ["o", "r", " "],
    ["d", "r", "e", "a", "d", ";"],
  ],
  [
    ['"', "L", "o", "o", "k", " "],
    ["f", "o", "r", "t", "h", ",", '"', " "],
    ["h", "e", " "],
    ["b", "a", "d", "e", " "],
    ["t", "h", "e", " "],
    ["s", "o", "u", "l", ",", " "],
    ["a", "n", "d", " "],
    ["f", "e", "a", "r", " "],
    ["n", "o", "t", ".", " "],
    ["W", "e", "e", "p", ","],
  ],
  [
    ["A", "l", "l", " "],
    ["y", "e", " "],
    ["t", "h", "a", "t", " "],
    ["t", "r", "u", "s", "t", " "],
    ["n", "o", "t", " "],
    ["i", "n", " "],
    ["h", "i", "s", " "],
    ["t", "r", "u", "t", "h", ",", " "],
    ["a", "n", "d", " "],
    ["k", "e", "e", "p"],
  ],
  [
    ["V", "a", "i", "n", " "],
    ["m", "e", "m", "o", "r", "y", "'", "s", " "],
    ["v", "i", "s", "i", "o", "n", " "],
    ["o", "f", " "],
    ["a", " "],
    ["v", "a", "n", "i", "s", "h", "e", "d", " "],
    ["h", "e", "a", "d"],
  ],
  [
    ["A", "s", " "],
    ["a", "l", "l", " "],
    ["t", "h", "a", "t", " "],
    ["l", "i", "v", "e", "s", " "],
    ["o", "f", " "],
    ["a", "l", "l", " "],
    ["t", "h", "a", "t", " "],
    ["o", "n", "c", "e", " "],
    ["w", "a", "s", " "],
    ["h", "e"],
  ],
  [
    ["S", "a", "v", "e", " "],
    ["t", "h", "a", "t", " "],
    ["w", "h", "i", "c", "h", " "],
    ["l", "i", "g", "h", "t", "e", "n", "s", " "],
    ["f", "r", "o", "m", " "],
    ["h", "i", "s", " "],
    ["w", "o", "r", "d", ";", " "],
    ["b", "u", "t", " "],
    ["w", "e", ","],
  ],
  [
    ["W", "h", "o", ",", " "],
    ["s", "e", "e", "i", "n", "g", " "],
    ["t", "h", "e", " "],
    ["s", "u", "n", "s", "e", "t", "-", "c", "o", "l", "o", "r", "e", "d", " "],
    ["w", "a", "t", "e", "r", "s", " "],
    ["r", "o", "l", "l", ","],
  ],
  [
    ["Y", "e", "t", " "],
    ["k", "n", "o", "w", " "],
    ["t", "h", "e", " "],
    ["s", "u", "n", " "],
    ["s", "u", "b", "d", "u", "e", "d", " "],
    ["n", "o", "t", " "],
    ["o", "f", " "],
    ["t", "h", "e", " "],
    ["s", "e", "a", ","],
  ],
  [
    ["N", "o", "r", " "],
    ["w", "e", "e", "p", " "],
    ["n", "o", "r", " "],
    ["d", "o", "u", "b", "t", " "],
    ["t", "h", "a", "t", " "],
    ["s", "t", "i", "l", "l", " "],
    ["t", "h", "e", " "],
    ["s", "p", "i", "r", "i", "t", " "],
    ["i", "s", " "],
    ["w", "h", "o", "l", "e", ","],
  ],
  [
    ["A", "n", "d", " "],
    ["l", "i", "f", "e", " "],
    ["a", "n", "d", " "],
    ["d", "e", "a", "t", "h", " "],
    ["b", "u", "t", " "],
    ["s", "h", "a", "d", "o", "w", "s", " "],
    ["o", "f", " "],
    ["t", "h", "e", " "],
    ["s", "o", "u", "l", "."],
  ],
]
