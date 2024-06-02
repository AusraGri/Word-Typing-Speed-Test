export const timeCounter = {
  counting: false,
  seconds: 0,
  timerElement: null,
  intervalId: null,
  timerStarted: false,
  startTimer: function (s = 60) {
    if (!this.timerStarted) {
      this.enableTimer(s)
      this.timerStarted = true
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
  reset: function () {
    this.counting = false
    this.seconds = 0
    this.timerStarted = false
    clearInterval(this.intervalId)
    this.intervalId = null
    this.showTimer()
  },
}
