import React, {Component} from 'react'
import {createNewCard} from '../store/card'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class Card extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      yourEmail: '',
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
    const {
      name,
      yourEmail,
      recipientName,
      imageUrl,
      recipientEmail,
      text
    } = this.state
    return (
      <Container>
        <Form>
          <h1>Make your card!</h1>
          <Form.Group id="card-form" onSubmit={this.handleSubmit}>
            <Form.Label htmlFor="name">Your name</Form.Label>
            <Form.Control
              placeholder="Enter your name"
              name="name"
              onChange={this.handleChange}
              value={name}
              type="text"
            />
            <Form.Label htmlFor="yourEmail">Your Email</Form.Label>
            <Form.Control
              placeholder="Enter your email"
              name="yourEmail"
              value={yourEmail}
              onChange={this.handleChange}
              type="text"
            />

            <Form.Label htmlFor="recepientName">Recipient Name</Form.Label>
            <Form.Control
              placeholder="Enter recipient name"
              name="recipientName"
              value={recipientName}
              onChange={this.handleChange}
              type="text"
            />

            <Form.Label htmlFor="recepientEmail">Recipient Email</Form.Label>
            <Form.Control
              placeholder="Enter recipient email"
              name="recipientEmail"
              value={recipientEmail}
              onChange={this.handleChange}
              type="text"
            />

            <Form.Label htmlFor="imageUrl">Upload Image</Form.Label>
            <Form.Control name="imageUrl" value={imageUrl} type="file" />

            <Form.Label htmlFor="textBox">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="text"
              value={text}
              onChange={this.handleChange}
              type="text"
            />
            <Button variant="dark" type="submit">
              Make my card!
            </Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

const mapDispatch = dispatch => ({
  newCard: card => dispatch(createNewCard(card))
})
export default connect(null, mapDispatch)(Card)
