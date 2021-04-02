const axios = require('axios')
const fs = require('fs')

// Data which will write in a file.
async function apiFetch() {
  let data = ''
  const request = await axios.request({
    method: 'GET',
    url: 'https://type.fit/api/quotes'
  })
  let poemLines = request.data
  while(poemLines.length > 0){
    let lines = poemLines.shift().lines
    for(let i = 0; i < lines.length; i++){
      if(lines[i].search("-") ===-1){
        data+= lines[i]
      }
    }
  }
  return data
}

apiFetch().then((result) => {
  fs.writeFile('corpus.txt', result, (err) => {
    if (err) throw err
  })
}, (error) => {console.log(error)})

