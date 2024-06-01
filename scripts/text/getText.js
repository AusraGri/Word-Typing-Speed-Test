export default async function getText() {
    try {
      const response = await fetch("https://poetrydb.org/linecount/20/lines")
      const poemLines = await response.json()
      const randomIndex = Math.floor(Math.random() * poemLines.length);
      const textArray = poemLines[randomIndex].lines
      return textArray
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  }