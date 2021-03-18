var corpus = `Andrey Markov was born on 14 June 1856 in Russia. He attended Petersburg Grammar[further explanation needed], where he was seen as a rebellious student by a select few teachers. In his academics he performed poorly in most subjects other than mathematics. Later in life he attended Petersburg University; among his teachers were Yulian Sokhotski (differential calculus, higher algebra), Konstantin Posse (analytic geometry), Yegor Zolotarev (integral calculus), Pafnuty Chebyshev (number theory and probability theory), Aleksandr Korkin (ordinary and partial differential equations), Mikhail Okatov
(mechanism theory), Osip Somov (mechanics), and Nikolai
Budajev (descriptive and higher geometry). He completed
his studies at the University and was later asked if he
would like to stay and have a career as a Mathematician.
 He later taught at high schools and continued his own
 mathematical studies. In this time he found a practical use for his mathematical skills. He figured out that he could use chains to model the alliteration of vowels and consonants in Russian literature. He also contributed to many other mathematical aspects in his time. He died at age 66 on 20 July 1922.`
var order = 5

//we will be using this ngrams object to store key value pairs of our n-grams
var ngrams = {}

function setup() {
  for (var i = 0; i <= corpus.length - order; i++) {
    //iterate through corpus and create n-grams
    //n-grams are collections of characters with a length of n (in this case the value of order)
    var gram = corpus.substring(i, i + order)
    //substring returns a part of corpus from starting index (inclusive) to ending index (exclusive)

    //if a particular n-gram doesn't exist...
    if (!ngrams[gram]) {
      //establish an array at that key
      ngrams[gram] = []
    }
    //when are now storing the character that follows the n-gram into the array
    ngrams[gram].push(corpus.charAt(i + order))

    //by the end of this function the ngrams object will have keys of our n-grams, and those keys will have a value of a character that followed the n-gram in each instance
  }
  // console.log(ngrams);
  markovIt()
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function markovIt() {
  //start at the first n-gram of the corpus text
  var currentGram = corpus.substring(0, order)
  var result = currentGram
  var resultLength = 100
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
    //move the current gram to be the last X characters of the result string, where X is equal to order
    currentGram = result.substring(result.length - order, result.length)
  }
  console.log(result)
  return result
}

setup()
