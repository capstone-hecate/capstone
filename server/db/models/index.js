const User = require('./user')
const Card = require('./card')


//User has a one-to-many association with Card
User.hasMany(Card)
Card.belongsTo(User)

module.exports = {
  User,
  Card
}
