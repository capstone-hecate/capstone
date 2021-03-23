import React, {useState, useEffect} from 'react'
import {createNewCard} from '../store/card'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {corpusMaker, generatePoem} from '../word-markov'
import {Link} from 'react-scroll'

const Card = props => {
  const [name, setName] = useState('')
  const [yourEmail, setYourEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [generating, isGenerating] = useState(false)

  const loadText = async () => {
    const corpus = await corpusMaker()
    const poem = generatePoem(await corpus, 3) // awaiting twice?
    setText(poem)
    isGenerating(false)
  }

  return (
    <Jumbotron id="card">
      <Form
        onSubmit={async evt => {
          evt.preventDefault()
          let template = props.getTemplate() // use props.template
          const fd = new FormData()
          fd.append('name', name)
          fd.append('yourEmail', yourEmail)
          fd.append('recipientName', recipientName)
          fd.append('recipientEmail', recipientEmail)
          fd.append('file', file)
          fd.append('text', text)
          fd.append('template', template)
          props.createNewCard(fd)
        }}
      >
        <h3 className="centered-header">Make your card!</h3>
        <Form.Group id="card-form">
          <Form.Label htmlFor="name">Your name</Form.Label>
          <Form.Control
            placeholder="Enter your name"
            name="name"
            onChange={e => setName(e.target.value)}
            type="text"
          />
          <Form.Label htmlFor="yourEmail">Your Email</Form.Label>
          <Form.Control
            placeholder="Enter your email"
            name="yourEmail"
            onChange={e => setYourEmail(e.target.value)}
            type="text"
          />

          <Form.Label htmlFor="recepientName">Recipient Name</Form.Label>
          <Form.Control
            placeholder="Enter recipient name"
            name="recipientName"
            onChange={e => setRecipientName(e.target.value)}
            type="text"
          />

          <Form.Label htmlFor="recepientEmail">Recipient Email</Form.Label>
          <Form.Control
            placeholder="Enter recipient email"
            name="recipientEmail"
            onChange={e => setRecipientEmail(e.target.value)}
            type="text"
          />

          <Form.Label>Upload your photo</Form.Label>
          <Form.Control
            type="file"
            onChange={e => {
              console.log(e.target.files[0])
              setFile(e.target.files[0])
            }}
          />

          <Form.Label htmlFor="textBox">Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="text"
            onChange={e => setText(e.target.value)}
            type="text"
            value={text}
          />
          <Button
            variant="dark"
            disabled={generating}
            onClick={() => {
              isGenerating(true)
              loadText()
            }}
          >
            {generating ? 'Loading...' : 'Generate Text'}
          </Button>
          <Link
            activeClass="active"
            to="final-card"
            smooth={true}
            spy={true}
            offset={-70}
            duration={500}
          >
            <Button variant="dark" type="submit">
              Make my card!
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </Jumbotron>
  )
}

const mapState = state => ({
  template: state.template
})

const mapDispatch = dispatch => ({
  createNewCard: card => dispatch(createNewCard(card))
})
export default connect(mapState, mapDispatch)(Card)
