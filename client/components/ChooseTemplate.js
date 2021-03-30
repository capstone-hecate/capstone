import React from 'react'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-scroll'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {setTemplate} from '../store/template'
import {connect} from 'react-redux'

// looks like we can remove this now
// potentially refactor so you map
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
          <p className="centered-header">
            eGreetr's automatic text generator writes your cards for you.
          </p>
          <h3 className="centered-header">
            Get started: choose your template!
          </h3>
          <img
            src="happy-birthday.jpg"
            width="300"
            alt="happy-birthday"
            onClick={() => this.onClick('happyBirthday')}
            className={
              this.state.template === 'happyBirthday' ? 'bordered-image' : ''
            }
          />
          <img
            src="thank-you.jpg"
            width="300"
            alt="thank-you"
            onClick={() => this.onClick('thankYou')}
            className={
              this.state.template === 'thankYou' ? 'bordered-image' : ''
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

          <img
            src="floral.jpg"
            width="300"
            alt="floral"
            onClick={() => this.onClick('floral')}
            className={this.state.template === 'floral' ? 'bordered-image' : ''}
          />

          <img
            src="congrats.jpg"
            width="300"
            alt="congrats"
            onClick={() => this.onClick('congrats')}
            className={
              this.state.template === 'congrats' ? 'bordered-image' : ''
            }
          />

          <img
            src="get-well.jpg"
            width="300"
            alt="get-well"
            onClick={() => this.onClick('getWell')}
            className={
              this.state.template === 'getWell' ? 'bordered-image' : ''
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
