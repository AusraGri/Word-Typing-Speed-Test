<script>
        document.addEventListener("DOMContentLoaded", () => {
            let capturedValues = [];
            let timerStarted = false;
            let timer;

            const keydownListener = (event) => {
                if (!timerStarted) {
                    timerStarted = true;
                    timer = setTimeout(() => {
                        document.removeEventListener('keydown', keydownListener);
                        console.log("Captured values:", capturedValues.join(''));
                    }, 60000); // 60 seconds
                }

                capturedValues.push(event.key);
            };

            document.addEventListener('keydown', keydownListener);
        });
</script>




const TypingTest1 = {
    letterContainers: null,
    currentContainerIndex: 0,
    currentLetterIndex: 0,
    correctWordsCount: 0,
    currentWordCorrect: true,
    totalWordsCount:0,
  
    init: function(letterContainers) {
      this.letterContainers = letterContainers;
      this.currentContainerIndex = 0;
      this.currentLetterIndex = 0;
      this.correctWordsCount = 0;
      this.currentWordCorrect = true;
      this.totalWordsCount = 0;
    },
  
    getLetterDivs: function(containerIndex) {
        return this.letterContainers[containerIndex];
    },
  
    moveToNextLetter: function() {
        const letterDiv = this.getLetterDivs(this.currentContainerIndex);
        this.currentLetterIndex++;
        if (this.currentLetterIndex >= letterDiv.textContent.length) {
          if (this.currentWordCorrect) {
            this.correctWordsCount++;
          }
          this.currentLetterIndex = 0;
          this.currentContainerIndex++;
          this.currentWordCorrect = true;
        }
    },
  
    moveToPreviousLetter: function() {
        if (this.currentLetterIndex > 0) {
            this.currentLetterIndex--;
        } else if (this.currentContainerIndex > 0) {
            this.currentContainerIndex--;
            const previousContainer = this.getLetterDivs(this.currentContainerIndex);
            this.currentLetterIndex = previousContainer.textContent.length - 1;
        }
        const letterDiv = this.getLetterDivs(this.currentContainerIndex)
        letterDiv.classList.remove('correct', 'incorrect');
    },
  
    handleKeydown: function(event) {
        if (this.currentContainerIndex < this.letterContainers.length) {
            const letterDiv = this.getLetterDivs(this.currentContainerIndex);
            const currentLetter = letterDiv.textContent[this.currentLetterIndex];
            const ignoredKeys = ['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'Escape'];
            if (ignoredKeys.includes(event.key)) {
                return;
            }
            if (event.key === 'Backspace') {
                letterDiv.classList.remove('correct', 'incorrect');
                this.moveToPreviousLetter();
            } else if (event.key === ' ' && currentLetter === '\u00A0'){
                letterDiv.classList.add('correct');
                letterDiv.classList.remove('incorrect');
                this.moveToNextLetter();
            }
            else if (event.key === currentLetter) {
                letterDiv.classList.add('correct');
                letterDiv.classList.remove('incorrect');
                this.moveToNextLetter();
            } else if  (event.key !== currentLetter){
                letterDiv.classList.add('incorrect');
                letterDiv.classList.remove('correct');
                this.moveToNextLetter();
            }else if (event.key === ' '){
              console.log("space has been pressed")
              if (keyValue === currentLetter){
                letterDiv.classList.add('correct');
                letterDiv.classList.remove('incorrect');
                this.currentWordCorrect = false;
                this.moveToNextLetter();
              }
            }
  
            // Check if all letters have been typed correctly
            if (this.currentContainerIndex >= this.letterContainers.length) {
                console.log('Correct sequence typed for all words!');
                // Optionally, reset the sequence
                // this.reset();
            }
        }
    },
  
    reset: function() {
        this.currentContainerIndex = 0;
        this.currentLetterIndex = 0;
        this.letterContainers.forEach(container => {
            container.classList.remove('correct', 'incorrect');
        });
    }
  };

  function accuracy(correct, total){
    return (correct / total) * 100
  }
  
  function netWpn(correct, seconds=60){
    try{
    let minutes = seconds/60
    const wpn = (correct / 5)/minutes
    if (wpn < 0){
      throw new Error(`WPN can't be negative: ${wpn}`)
    }else{
      return wpn
    }
    }catch (err){
      console.log(`ERROR: ${err}`)
    }
  }
  class userProgress{
    constructor (wpm, accuracy){
    this.date = userProgress.dateNow()
    this.wpm = wpm;
    this.accuracy = accuracy;
    }
  
    static dateNow (){
      const d = new Date()
      const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}: ${d.getMinutes()}: ${d.getSeconds()}`
      return date
    }
  }
  
  function saveProgress(wpm, accuracy){
    //save created progress
    const progress = new userProgress(wpm, accuracy);
    let userProgressData = JSON.parse(localStorage.getItem('userProgress')) || [];
    userProgressData.push(progress);
    localStorage.setItem('userProgress', JSON.stringify(userProgressData))
  }
  function loadProgress(){
    //load user progress
    const userProgressData = JSON.parse(localStorage.getItem('userProgress')) || [];
    return userProgressData
  }