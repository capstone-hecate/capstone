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
