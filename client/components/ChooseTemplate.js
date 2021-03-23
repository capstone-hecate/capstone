import React from 'react'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-scroll'
import Jumbotron from 'react-bootstrap/Jumbotron'

let templates = [
  {name: 'happy-birthday', image: 'happy-birthday.jpg'},
  {name: 'thank-you', image: 'thank-you.jpg'},
  {name: 'general', image: 'general.jpg'}
]

class ChooseTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {template: ''}
    this.onClick = this.onClick.bind(this)
  }

  async onClick(templateName) {
    await this.setState({template: templateName})
    console.log(this.state)
    this.props.selectTemplate(templateName)
  }

  render() {
    console.log('props in choose template', this.props)
    return (
      <>
        <Jumbotron>
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
            <Link
              activeClass="active"
              to="card"
              smooth={true}
              spy={true}
              offset={-70}
              duration={500}
            >
              <Button type="submit" variant="dark">
                Next step
              </Button>
            </Link>
          </div>
        </Jumbotron>
      </>
    )
  }
}

// const mapDispatch = (dispatch) => {
//   console.log("mapping dispatch")
//   return {
//   updateTemplate: (template) => dispatch(updateTemplateThunk(template))
//   }
// }

export default ChooseTemplate
