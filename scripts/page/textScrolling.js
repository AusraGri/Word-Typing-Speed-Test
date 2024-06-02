export function scrollToHighlighted(pageElement) {
    const highlightedSentence = pageElement.querySelector(".highlight-sentence");
    if (highlightedSentence) {
        highlightedSentence.scrollIntoView({ behavior: "smooth"});
    }
}
