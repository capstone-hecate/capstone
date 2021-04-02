const axios = require('axios')
const fs = require('fs')

// Data which will write in a file.
async function apiFetch() {
  let corpus = ''
  const results = await axios.request({
    method: 'GET',
    url: 'https://type.fit/api/quotes'
  })
  const quotes = results.data
  for (let i = 0; i < quotes.length; i++) {
    corpus += quotes[i].text
    corpus += ' '
  }
  return corpus
}

apiFetch().then((result) => {
  fs.writeFile('corpus.txt', result, (err) => {
    if (err) throw err
  })
}, (error) => {console.log(error)})

