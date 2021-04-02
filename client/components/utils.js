export const templatesList = [
  {name: 'happyBirthday', image: 'happy-birthday.jpg'},
  {name: 'thankYou', image: 'thank-you.jpg'},
  {name: 'general', image: 'general.jpg'},
  {name: 'floral', image: 'floral.jpg'},
  {name: 'congrats', image: 'congrats.jpg'},
  {name: 'getWell', image: 'get-well.jpg'},
  {name: 'goodVibes', image: 'good-vibes.jpg'},
  {name: 'justForYou', image: 'just-for-you.jpg'},
  {name: 'thinkingOfYou', image: 'thinking-of-you.jpg'}
]

export const templates = {
  thankYou: {imgSrc: 'thank-you.jpg', fontColor: '#5f826d', x: 90, y: 175},
  happyBirthday: {
    imgSrc: 'happy-birthday.jpg',
    fontColor: '#a45464',
    x: 30,
    y: 175
  },
  general: {imgSrc: 'general.jpg', fontColor: 'black', x: 25, y: 318},
  floral: {imgSrc: 'floral.jpg', fontColor: 'white', x: 35, y: 155},
  congrats: {imgSrc: 'congrats.jpg', fontColor: 'white', x: 75, y: 290},
  getWell: {imgSrc: 'get-well.jpg', fontColor: '#1a432c', x: 75, y: 250},
  goodVibes: {imgSrc: 'good-vibes.jpg', fontColor: 'white', x: 75, y: 250},
  justForYou: {imgSrc: 'just-for-you.jpg', fontColor: 'black', x: 75, y: 225},
  thinkingOfYou: {
    imgSrc: 'thinking-of-you.jpg',
    fontColor: 'black',
    x: 50,
    y: 200
  }
}

export const lineMaker = (string) => {
  //split the string into an Array of words delimited by space
  let arrayOfWords = string.split(' ');

  for(let i = 0; i < arrayOfWords.length; i++){
    if(i%8 === 0 && i !== 0){
      arrayOfWords[i] += '\n'
    }
  }
  const result = arrayOfWords.slice(0, 25)
  return result.join(' ')
}
