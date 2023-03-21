export function removeNewsSource(articleTitle: string) {
  const indexOfLastDash = articleTitle.lastIndexOf('-');
  if (indexOfLastDash !== -1) {
    return articleTitle.substring(0, indexOfLastDash).trim();
  }
  return articleTitle;
}
