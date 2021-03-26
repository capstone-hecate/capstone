import React from 'react'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-scroll'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {setTemplate} from '../store/template'
import {connect} from 'react-redux'

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

  onClick(templateName) {
    this.setState({template: templateName})
    this.props.setTemplate(templateName)
    this.props.selectTemplate(templateName)
  }

  render() {
    return (
      <>
        <Jumbotron id="choose-template">
          <p className='centered-header'>eGreetr's automatic text generator writes your cards for you.</p>
          <h3 className="centered-header">Get started: choose your template!</h3>
          <img
            src="happy-birthday.jpg"
            width="300"
            alt="happy-birthday"
            onClick={() => this.onClick('happy-birthday')}
            className={
              this.state.template === 'happy-birthday' ? 'bordered-image' : ''
            }
          />
          <img
            src="thank-you.jpg"
            width="300"
            alt="thank-you"
            onClick={() => this.onClick('thank-you')}
            className={
              this.state.template === 'thank-you' ? 'bordered-image' : ''
            }
          />
          <img
            src="general.jpg"
            width="300"
            alt="general"
            onClick={() => this.onClick('general')}
            className={
              this.state.template === 'general' ? 'bordered-image' : ''
            }
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

const mapDispatch = dispatch => {
  return {
    setTemplate: template => dispatch(setTemplate(template))
  }
}

export default connect(null, mapDispatch)(ChooseTemplate)
