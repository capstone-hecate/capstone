// Create the character level generator with a pre trained model
// const rnn = ml5.charRNN('/models/corpus2/', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

export async function generateText () {
  const rnn = ml5.charRNN('/models/corpus/', modelLoaded);
  await rnn.generate({seed: 'She was ', length: 150}, (err, results) => {
    console.log(err)
    let machineText = results.sample
    return machineText
  })
}

export const textAttempt = generateText()

// Generate content
// rnn.generate({ seed: 'She was ', length: 150}, (err, results) => {
//   console.log(err, 'error')
//   console.log(results.sample)
// });



