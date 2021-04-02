import React from 'react'
import {createNewCard} from '../store/card'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Spinner from 'react-bootstrap/Spinner'
import {corpusMaker, generatePoem} from '../word-markov'
import {Link} from 'react-scroll'
import history from '../history'
import {lineMaker} from './utils'
import {generateText, textAttempt} from '../../public/ml5'

class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      yourEmail: '',
      recipientName: '',
      recipientEmail: '',
      text: '',
      markovGenerating: false,
      machineGenerating: false,
      validated: false,
      setValidated: false
    }

    this.loadText = this.loadText.bind(this)
    this.setEditedText = this.setEditedText.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getText = this.getText.bind(this)
  }

  async loadText() {
    const corpus = await corpusMaker()
    const poem = generatePoem(corpus, 3)
    const generatedText = `Dear ${this.state.recipientName}, \n${poem}Yours, ${
      this.state.name
    }`
    this.setState({text: generatedText})
    this.setState({markovGenerating: false})
  }

  setEditedText(generatedText) {
    this.props.setGeneratedText(generatedText)
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  async getText() {
    const rnn = ml5.charRNN('/models/quotes/');
    await rnn.generate({seed: 'Wishing you a ', length: 140}, (err, results) => {
      console.log(err)
      let text = results.sample
      console.log("unedited text", text)
      const editedText = lineMaker(text)
      const finalText = `Dear ${this.state.recipientName}, \n${editedText}Yours, ${
        this.state.name
      }`
      this.setState({text: finalText})
      this.setState({machineGenerating: false})
    })
  }

  render() {
    let template = this.props.template || {}
    let name = template.name || ''
    return (
      <Jumbotron id="card">
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={e => {
            const form = e.currentTarget
            if (form.checkValidity() === false) {
              e.preventDefault()
              e.stopPropagation()
            }

            this.setState({validated: true})
            if (form.checkValidity() === true) {
              e.preventDefault()
              this.props.createNewCard(this.state)
              history.push('/final-card')
            }
          }}
        >
          <h3 className="centered-header">Make your card!</h3>
          <Form.Group id="card-form">
            <Form.Label htmlFor="name">Your name</Form.Label>
            <Form.Control
              required
              placeholder="Enter your name"
              name="name"
              onChange={this.handleChange}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
            <Form.Label htmlFor="yourEmail">Your Email</Form.Label>
            <Form.Control
              required
              placeholder="Enter your email"
              name="yourEmail"
              onChange={this.handleChange}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email.
            </Form.Control.Feedback>

            <Form.Label htmlFor="recepientName">Recipient Name</Form.Label>
            <Form.Control
              required
              placeholder="Enter recipient name"
              name="recipientName"
              onChange={this.handleChange}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Please enter recipient name.
            </Form.Control.Feedback>

            <Form.Label htmlFor="recepientEmail">Recipient Email</Form.Label>
            <Form.Control
              required
              placeholder="Enter recipient email"
              name="recipientEmail"
              onChange={this.handleChange}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Please enter recipient email.
            </Form.Control.Feedback>

            {name === 'general' && (
              <>
                <Form.Label>Upload your photo</Form.Label>
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
                <Form.Text className="text-muted">
                  Must be .jpeg or .png
                </Form.Text>
              </>
            )}

            <Form.Label htmlFor="textBox">Generate message with:<Button
              variant="outline-dark"
              className='generate-button'
              size='sm'
              disabled={this.state.machineGenerating || this.state.markovGenerating}
              onClick={() => {
                this.setState({machineGenerating: true})
                this.getText()
              }}
            >
              {this.state.machineGenerating ? <>Loading... <Spinner as="span" animation="border" size="sm" /></> : 'Machine Learning'}
            </Button><Button
              variant="outline-dark"
              className='generate-button'
              size='sm'
              disabled={this.state.markovGenerating || this.state.machineGenerating}
              onClick={() => {
                this.setState({markovGenerating: true})
                this.loadText()
              }}
            >
              {this.state.markovGenerating ? <>Loading... <Spinner as="span" animation="border" size="sm" /></>  : 'Markov Chains'}
            </Button></Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={6}
              name="text"
              onChange={e => {
                this.handleChange(e)
                this.setEditedText(e.target.value)
              }}
              type="text"
              value={this.state.text}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your message or click "Generate message" button.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We have two different technologies to generate text! Feel free to try both and edit the text afterwards. Click on a button again to generate new text.<br/> Note: Machine learning will take a few extra seconds.
            </Form.Text>
            <div className='button-container'>
              <Button variant="dark" type="submit">
                Make my card!
              </Button>

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
            </div>
          </Form.Group>
        </Form>
      </Jumbotron>
    )
  }
}

const mapState = state => {
  return {
    template: state.template.template
  }
}

const mapDispatch = dispatch => {
  return {
    createNewCard: card => dispatch(createNewCard(card))
  }
}
export default connect(mapState, mapDispatch)(Card)
