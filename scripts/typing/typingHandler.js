export const typingTest = {
    enabled: false,
    textContainer: null,
    wordContainers: null,
    currentWordIndex: 0,
    currentLetterIndex: 0,
    correctLettersCount: 0,
    incorrectLettersCount: 0,
    totalLettersCount: 0,
  
    init: function (textContainer) {
      this.textContainer = textContainer
      this.wordContainers = this.getWordContainers()
      this.reset()
    },
  
    handleKeydown: function (event) {
      if (this.enabled) {
        this.onKeydownEvent(event)
      } else if (!this.enabled) {
        console.log("key handler is not enabled")
      }
    },
  
    getLetterDivs: function (wordIndex) {
        let words = this.textContainer.querySelectorAll('.words')
      return words[wordIndex].querySelectorAll(".letters")
    },

    getSentenceDivs: function () {
        return this.textContainer.querySelectorAll('.sentence')
      },
    
    getWordContainers: function(){
        return this.textContainer.querySelectorAll('.words')
    },

  
    highlightCurrentLetter: function () {
      const letterDivs = this.getLetterDivs(this.currentWordIndex)
      letterDivs.forEach((div, index) => {
        if (index === this.currentLetterIndex) {
          div.classList.add("highlight")
        } else {
          div.classList.remove("highlight")
        }
      })
    },
  
    highlightCurrentSentence: function() {
        const sentences = this.getSentenceDivs()
        sentences.forEach(sentence => {
          const highlightedLetters = sentence.querySelectorAll('.highlight')
          if (highlightedLetters.length > 0) {
            sentence.classList.add('highlight-sentence')
          } else {
            sentence.classList.remove('highlight-sentence')
          }
        })
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
        this.highlightCurrentSentence()
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
      this.highlightCurrentSentence()
    },
  
    onKeydownEvent: function (event) {
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
          "Enter"
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
          event.preventDefault();
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
      this.resetStyles()
      this.highlightCurrentLetter()
      this.highlightCurrentSentence()
    },
    resetStyles: function(){
        let words = this.textContainer.querySelectorAll('.words')
      words.forEach((word)=>{
        let letterElements = word.querySelectorAll('.letters')
        letterElements.forEach((element)=> {
          element.classList.remove('incorrect','correct','highlight')}
        )
  
      })
    }
  }
  