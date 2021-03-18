const axios = require('axios')

let corpus = ''

async function corpusMaker() {
  try {
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

corpusMaker()

module.exports = corpus
