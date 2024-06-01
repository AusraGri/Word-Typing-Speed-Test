import getText from "./getText.js";
import cleanText from "./textProcessors.js";
import createTextStructure from "./texDivs.js";

export default async function createTextDivs(){
    const text = await getText()
    const textArray = cleanText(text)
    const textDivs = createTextStructure(textArray)
    return textDivs
}
