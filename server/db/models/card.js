const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  name: {
    type: Sequelize.STRING
  },
  yourEmail: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.BLOB
  },
  template: {
    type: Sequelize.ENUM('happy-birthday, thank-you, general')
  },
  recipientName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  recipientEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Card
