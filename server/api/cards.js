const router = require('express').Router()
const db = require('../db')
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

//POST api/cards/card
router.post('/card', async (req, res, next) => {
  try {
    // console.log(req.body)
    const newCard = await Card.create(req.body)
    console.log(req.files.image)
    // const {data} = req.files.image
    res.json(newCard)
    // if (data){
    // await db.insert({ imageUrl: data}).into('cards')
    // res.sendStatus(200)
    // } else {
    //   res.sendStatus(400)
    // }
  } catch (err) {
    next(err)
  }
})
