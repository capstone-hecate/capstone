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
        creatorId: req.user.id
      })
    }
    card = await Card.create({
      name: req.body.name,
      yourEmail: req.body.yourEmail,
      recipientName: req.body.recipientName,
      recipientEmail: req.body.recipientEmail,
      text: req.body.text,
      template: req.body.template
    })
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
