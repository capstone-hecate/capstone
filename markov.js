const axios = require('axios')

async function corpusMaker() {
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
      if (i === quotes.length - 1) {
        generateText(corpus, 4, 60, 'toast')
      }
    }
    return corpus
  } catch (error) {
    console.log(error)
  }
}

function generateText(corpus, ngramSize, resultLength, userInput) {
  //we will be using this ngrams object to store key value pairs of our n-grams
  var ngrams = {}

  for (var i = 0; i <= corpus.length - ngramSize; i++) {
    //iterate through corpus and create n-grams
    //n-grams are collections of characters with a length of n (in this case the value of ngramSize)
    //substring returns a part of corpus from starting index (inclusive) to ending index (exclusive)
    var gram = corpus.substring(i, i + ngramSize)

    //if a particular n-gram doesn't exist...
    if (!ngrams[gram]) {
      //establish an array at that key
      ngrams[gram] = []
    }

    //when are now storing the character that follows the n-gram into the array
    ngrams[gram].push(corpus.charAt(i + ngramSize))

    //by the end of this function the ngrams object will have keys of our n-grams, and those keys will have a value of a character that followed the n-gram in each instance
  }
  return markovIt(corpus, ngrams, ngramSize, resultLength, userInput)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function markovIt(corpus, ngrams, ngramSize, resultLength, userInput) {
  //getting random word
  const randomChar = corpus.charAt(getRandomInt(0, corpus.length))
  if (randomChar.match(/^[A-Za-z]+$/)) {
    console.log(randomChar)
  }

  //start at the first n-gram of the corpus text
  var result = userInput

  var currentGram = result.substring(result.length - ngramSize, result.length)

  for (var i = 0; i < resultLength; i++) {
    //loop through possible next characters by looking at the n-grams object
    var possibleChars = ngrams[currentGram]
    if (!possibleChars) {
      break
    }
    //select one of the possible characters that come next according to the n-gram object
    var nextChar = possibleChars[getRandomInt(0, possibleChars.length)]
    //add that selected character to the result string
    result += nextChar
    //move the current gram to be the last X characters of the result string, where X is equal to ngramSize
    currentGram = result.substring(result.length - ngramSize, result.length)
  }
  console.log(result)
  return result
}

corpusMaker()
