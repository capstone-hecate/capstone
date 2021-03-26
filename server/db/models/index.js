const User = require('./user')
const Card = require('./card')

//User has a one-to-many association with Card
User.hasMany(Card, {foreignKey: 'creatorId'})
Card.belongsTo(User)

Card.hasMany(User, {foreignKey: 'recipientId'})
User.belongsTo(Card)

module.exports = {
  User,
  Card
}
