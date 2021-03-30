const router = require('express').Router()
const {Card} = require('../db/models')
module.exports = router

//GET /api/cards/:cardId
router.get('/:cardId', async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: {
        id: req.params.cardId
      }
    })
    res.json(card)
  } catch (err) {
    next(err)
  }
})

// how could we refactor to make this cleaner?
// create a newCard object with all the fields except userId
// If statement will add the userId if applicable (no need for else)
// next line is Card.create(newCard)
//POST api/cards/
router.post('/', async (req, res, next) => {
  try {
    let card
    if (req.user) {
      card = await Card.create({
        name: req.body.name,
        yourEmail: req.body.yourEmail,
        recipientName: req.body.recipientName,
        recipientEmail: req.body.recipientEmail,
        text: req.body.text,
        template: req.body.template,
        userId: req.user.id
      })
    } else {
      card = await Card.create({
        name: req.body.name,
        yourEmail: req.body.yourEmail,
        recipientName: req.body.recipientName,
        recipientEmail: req.body.recipientEmail,
        text: req.body.text,
        template: req.body.template
      })
    }
    res.json(card)
  } catch (err) {
    next(err)
  }
})

//PUT api/cards/:cardId
router.put('/:cardId', async (req, res, next) => {
  // console.log('req.body', req.body)
  try {
    let card = await Card.findOne({
      where: {
        id: req.params.cardId
      }
    })
    card.cardUrl = req.body.Url
    await card.save()
  } catch (error) {
    next(error)
  }
})
