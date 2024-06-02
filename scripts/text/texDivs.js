// Function to create the structure of divs from the nested text array
export default function createTextStructure(arr) {
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

function createDivWithClass(className) {
  const div = document.createElement("div")
  div.className = className
  return div
}
