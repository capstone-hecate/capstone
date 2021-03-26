const User = require('./user')
const Card = require('./card')

//User has a one-to-many association with Card
User.hasMany(Card)
Card.belongsTo(User)

User.hasMany(Card)
Card.belongsTo(User, {as: 'receiver'})

module.exports = {
  User,
  Card
}
