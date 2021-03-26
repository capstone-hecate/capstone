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
  },
  cardUrl: {
    type: Sequelize.TEXT
  }
})

module.exports = Card
