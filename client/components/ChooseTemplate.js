import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import Card from './Card'

let templates = [
  {name: 'happy-birthday', image: 'happy-birthday.jpg'},
  {name: 'thank-you', image: 'thank-you.jpg'},
  {name: 'general', image: 'general.jpg'}
]

class ChooseTemplate extends React.Component {
  constructor() {
    super()
    this.state = {template: '', clicked: false}
    this.onClick = this.onClick.bind(this)
  }

  onClick(templateName) {
    this.setState({template: templateName, clicked: !this.state.clicked})
    console.log(this.state)
  }

  render() {
    return (
      <>
        <Container>
          <h3 className="centered-header">Choose your template:</h3>
          <img
            src="happy-birthday.jpg"
            width="300"
            alt="happy-birthday"
            onClick={() => this.onClick('happy-birthday')}
            className={this.state.clicked ? 'bordered-image' : ''}
          />
          <img
            src="thank-you.jpg"
            width="300"
            alt="thank-you"
            onClick={() => this.onClick('thank-you')}
            className={this.state.clicked ? 'bordered-image' : ''}
          />
          <img
            src="general.jpg"
            width="300"
            alt="general"
            onClick={() => this.onClick('general')}
            className={this.state.clicked ? 'bordered-image' : ''}
          />

          <div>
            <Link to="/card">
              <Button type="submit">Next step</Button>
            </Link>
          </div>
        </Container>
      </>
    )
  }
}

export default ChooseTemplate
