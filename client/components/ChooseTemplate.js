import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {connect} from 'react-redux'
import Template from './Template'
import {templatesList as templates} from './utils'

class ChooseTemplate extends React.Component {
  render() {
    return (
      <Jumbotron id="choose-template">
        <p className="centered-header">
          eGreetr's automatic text generator writes your cards for you.
        </p>
        <h3 className="centered-header">Get started: choose your template!</h3>
        <div className="templates-container">
          {templates.map(template => {
            return <Template key={template.name} template={template} />
          })}
        </div>
      </Jumbotron>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    setTemplate: template => dispatch(setTemplate(template))
  }
}

export default connect(null, mapDispatch)(ChooseTemplate)
