import React, {useState, useEffect} from 'react'
import {createNewCard} from '../store/card'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {corpusMaker, generatePoem} from '../word-markov'
import {Link} from 'react-scroll'
import {render} from 'enzyme'

class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      yourEmail: '',
      recipientName: '',
      recipientEmail: '',
      text: '',
      generating: false
    }
    this.loadText = this.loadText.bind(this)
    this.setEditedText = this.setEditedText.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async loadText() {
    const corpus = await corpusMaker()
    const poem = generatePoem(corpus, 3)
    const generatedText = `Dear ${this.state.recipientName}, \n${poem}Yours, ${
      this.state.name
    }`
    this.setState({text: generatedText})
    this.props.setGeneratedText(generatedText)
    this.setState({generating: false})
  }

  setEditedText(generatedText) {
    this.props.setGeneratedText(generatedText)
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <Jumbotron id="card">
        <Form>
          <h3 className="centered-header">Make your card!</h3>
          <Form.Group id="card-form">
            <Form.Label htmlFor="name">Your name</Form.Label>
            <Form.Control
              placeholder="Enter your name"
              name="name"
              onChange={this.handleChange}
              type="text"
            />
            <Form.Label htmlFor="yourEmail">Your Email</Form.Label>
            <Form.Control
              placeholder="Enter your email"
              name="yourEmail"
              onChange={this.handleChange}
              type="text"
            />

            <Form.Label htmlFor="recepientName">Recipient Name</Form.Label>
            <Form.Control
              placeholder="Enter recipient name"
              name="recipientName"
              onChange={this.handleChange}
              type="text"
            />

            <Form.Label htmlFor="recepientEmail">Recipient Email</Form.Label>
            <Form.Control
              placeholder="Enter recipient email"
              name="recipientEmail"
              onChange={this.handleChange}
              type="text"
            />

            <Form.Label>Upload your photo (optional)</Form.Label>
            <Form.Control
              type="file"
              onChange={e => {
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = function() {
                  localStorage.setItem('currentImage', reader.result)
                }
              }}
            />

            <Form.Label htmlFor="textBox">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="text"
              onChange={e => {
                this.handleChange(e)
                this.setEditedText(e.target.value)
              }}
              type="text"
              value={this.state.text}
            />
            <Button
              variant="dark"
              disabled={this.state.generating}
              onClick={() => {
                this.setState({generating: true})
                this.loadText()
              }}
            >
              {this.state.generating ? 'Loading...' : 'Generate Text'}
            </Button>
            <Link
              activeClass="active"
              to="final-card"
              smooth={true}
              spy={true}
              offset={-70}
              duration={500}
            >
              <Button
                variant="dark"
                type="button"
                onClick={e => {
                  e.preventDefault()
                  this.props.createNewCard(this.state)
                }}
              >
                Make my card!
              </Button>
            </Link>
            <Link
              activeClass="active"
              to="choose-template"
              smooth={true}
              spy={true}
              offset={-70}
              duration={500}
            >
              <Button variant="dark">Go back</Button>
            </Link>
          </Form.Group>
        </Form>
      </Jumbotron>
    )
  }
}
// const mapState = state => ({
//   template: state.template
// })

const mapDispatch = dispatch => ({
  createNewCard: card => dispatch(createNewCard(card))
})
export default connect(null, mapDispatch)(Card)
