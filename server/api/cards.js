const router = require('express').Router()
const {Card} = require('../db/models')
const multer = require('multer')
const fs = require('fs')
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

var upload = multer({dest: 'uploads/'})

//POST api/cards/
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    console.log('req.body-->', req.body)
    var imageData = fs.readFileSync(req.file.path)
    const card = await Card.create({
      name: req.body.name,
      yourEmail: req.body.yourEmail,
      recipientName: req.body.recipientName,
      recipientEmail: req.body.recipientEmail,
      imageUrl: imageData,
      text: req.body.text,
      template: req.body.template
    })
    res.json(card)
  } catch (err) {
    next(err)
  }
})
