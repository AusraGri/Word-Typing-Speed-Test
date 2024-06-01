export default function cleanText (textArray){
const textSentences = removeSpaces(textArray)
const words = wordLines(textSentences)
return words
}


function removeSpaces(textArray){
    return textArray.map(line => line.trim()).filter(line => line !== "");
  }
  // split array of sentences into array of array words [[word, word1], [word, word2, word3]]
  function wordLines(textArray) {
    const len = textArray.length
    return textArray.map((array) => {
      array.trim()
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