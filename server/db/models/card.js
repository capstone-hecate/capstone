const Sequelize = require('sequelize')
const db = require('../db')

const Card = db.define('card', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  template: {
    type: Sequelize.ENUM('templateOne, templateTwo, templateThree')
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
