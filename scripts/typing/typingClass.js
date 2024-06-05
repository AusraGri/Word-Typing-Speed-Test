class TypingEventHandler{
    constructor(textContainer, event){
        if (textContainer && textContainer instanceof Element){
            this.textContainer = textContainer
            this.event = event
            this.wordContainer = this.#getWordContainers()
            this.reset()
        }

        #getWordContainers() {
          return this.textContainer.querySelectorAll(".words")
          }

        #getLetterDivs (wordIndex) {
            let words = this.textContainer.querySelectorAll(".words")

            return words[wordIndex].querySelectorAll(".letters")
          }

        #getSentenceDivs () {
            return this.textContainer.querySelectorAll(".sentence")
          }
    }
}