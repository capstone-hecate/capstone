import React, {Component} from 'react'
import {createNewCard} from '../store/card'
import {connect} from 'react-redux'

class Card extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      recipientName: '',
      recipientEmail: '',
      imageUrl: '',

      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.newCard({...this.state})
  }
  render() {
    const {name, recipientName, imageUrl, recipientEmail, text} = this.state
    return (
      <>
        <h1>Make your card!</h1>
        <form id="card-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            onChange={this.handleChange}
            value={name}
            type="text"
          />

          <label htmlFor="recepientName">Recipient Name</label>
          <input
            name="recipientName"
            value={recipientName}
            onChange={this.handleChange}
            type="text"
          />

          <label htmlFor="recepientEmail">Recipient Email</label>
          <input
            name="recipientEmail"
            value={recipientEmail}
            onChange={this.handleChange}
            type="text"
          />

          <label htmlFor="imageUrl">Upload Image</label>
          <input name="imageUrl" value={imageUrl} type="file" />

          <label htmlFor="textBox">Content</label>
          <textarea
            name="text"
            value={text}
            onChange={this.handleChange}
            type="text"
            rows="4"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

const mapDispatch = dispatch => ({
  newCard: card => dispatch(createNewCard(card))
})
export default connect(null, mapDispatch)(Card)
