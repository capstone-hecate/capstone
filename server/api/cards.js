const router = require('express').Router()
const {Card} = require('../db/models')
const multer = require('multer')
const {path} = require('..')

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

//set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})
//init upload
const upload = multer({
  storage: storage
})

//POST api/cards/card
router.post('/card', upload.single('imageUrl'), async (req, res, next) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      yourEmail: req.body.yourEmail,
      recipientName: req.body.recipientName,
      recipientEmail: req.body.recipientEmail,
      imageUrl: '/uploads/' + req.imageUrl,
      text: req.body.text
    })
    res.json(card)
  } catch (err) {
    next(err)
  }
})
