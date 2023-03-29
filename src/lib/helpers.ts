export function removeNewsSource(articleTitle: string) {
  const indexOfLastDash = articleTitle.lastIndexOf('-');
  if (indexOfLastDash !== -1) {
    return articleTitle.substring(0, indexOfLastDash).trim();
  }
  return articleTitle;
}

export function shortenParagraph(paragraph, numWords) {
  const words = paragraph.split(' ');
  if (words.length <= numWords) {
    return paragraph;
  }
  const shortenedWords = words.slice(0, numWords);
  const shortenedParagraph = shortenedWords.join(' ') + '...';
  return shortenedParagraph;
}
