export const capitalize = (text) => {
  const words = text.split(' ')
  if (words.length > 1) {
    return words.map(t => t.charAt(0).toUpperCase() + t.slice(1)).reduce((newText, t) => {
      return `${newText} ${t}`
    }, '').trim()
  } else {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
