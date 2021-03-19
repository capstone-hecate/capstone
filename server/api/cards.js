const router = require('express').Router()
const {Card} = require('../db/models')
const multer = require('multer')
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
// const storage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + '-' + Date.now() + file.originalname
//     )
//   }
// })
// //init upload
// const upload = multer({
//   storage: storage
// })
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
  })
})

//POST api/cards/card
router.post('/card', upload.single('file'), async (req, res, next) => {
  try {
    console.log('------------', req.file.filename)
    const card = await Card.build({
      // name: req.body.name,
      // yourEmail: req.body.yourEmail,
      recipientName: req.body.recipientName,
      recipientEmail: req.body.recipientEmail,
      imageUrl: '/uploads/' + req.file.filename,
      text: req.body.text
    })
    await card.save()
    console.log('===========>', card)
    res.json(card)
  } catch (err) {
    next(err)
  }
})
