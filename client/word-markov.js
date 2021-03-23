const axios = require('axios')

export async function corpusMaker() {
  try {
    let corpus = ''
    const results = await axios.request({
      method: 'GET',
      url: 'https://type.fit/api/quotes'
    })
    const quotes = results.data
    // console.log(quotes.length)
    //quotes.length === 1643

    for (let i = 0; i < quotes.length; i++) {
      corpus += quotes[i].text
      corpus += ' '
    }
    return corpus
  } catch (error) {
    console.log(error)
  }
}

function parseText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/gi, '')
    .split(' ')
}

function generateWordpairs(corpus) {
  // Our object that has word pairs stored as an object
  let wordpairs = {}

  // Get all the words in our corpus, we lowercase it and replace non-word characters
  // To increase our chance of finding matching pairs
  let words = parseText(corpus)

  // For every word
  for (let i = 0; i < words.length - 1; i++) {
    let currentWord = words[i]
    let nextWord = words[i + 1]

    if (wordpairs[currentWord]) {
      // We've seen this word before
      wordpairs[currentWord].push(nextWord)
    } else {
      wordpairs[currentWord] = [nextWord]
    }
  }

  return wordpairs
}

function randomlyChoose(wordArray) {
  let index = Math.floor(wordArray.length * Math.random())
  return wordArray[index]
}

function writeLine(corpus, minLength) {
  let words = parseText(corpus)
  let wordpairs = generateWordpairs(corpus)
  let word = randomlyChoose(words)
  let phrase = [word] // start the phrase

  while (wordpairs[word]) {
    let nextWords = wordpairs[word]
    word = randomlyChoose(nextWords)
    phrase.push(word)

    if (phrase.length > minLength) {
      break
    }
  }

  return phrase.join(' ')
}

export const generatePoem = (corpus, lines) => {
  let poem = ''

  for (let i = 0; i < lines; i++) {
    let l = Math.floor(Math.random() * 10) + 1
    poem += writeLine(corpus, l)
    poem += '\n'
  }
  return poem
}
