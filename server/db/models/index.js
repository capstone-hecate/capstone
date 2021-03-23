const User = require('./user')
const Card = require('./card')


//User has a one-to-many association with Card
User.hasMany(Card)
Card.belongsTo(User)

// would we eventually need this to be many-to-many? is there a case where a user would log in to view all the cards that have been sent to them? or is this handled strictly over email?

// option 2: 
// User.hasMany(Card)
// Card.belongsTo(User, {as: 'creator'})
// User.hasMany(Card)
// Card.belongsTo(User, {as: 'receiver'})

module.exports = {
  User,
  Card
}
