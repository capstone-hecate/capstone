import React, {Component} from 'react'
// import {connect} from 'react-redux'

class Card extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      recipientEmail: '',
      image: '',
      textBox: ''
    }
  }
  render() {
    const {name, recipientEmail, image, textBox} = this.state
    return (
      <>
        <h1>Make your card!</h1>
        <form id="card-form">
          <label htmlFor="name">Name:</label>
          <input name="name" value={name} type="text" />
          <label htmlFor="recepientEmail">Recipient Email:</label>
          <input name="content" value={recipientEmail} type="text" />
          <label htmlFor="textBox">Content:</label>
          <input name="content" value={textBox} type="text" />
        </form>
      </>
    )
  }
}
export default Card
