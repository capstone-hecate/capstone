import React from 'react'
import {Link} from 'react-scroll'
import {setTemplate} from '../store/template'
import {connect} from 'react-redux'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(templateName) {
    this.props.setTemplate(templateName)
  }

  render() {
    let name = this.props.template.name
    return (
      <Link
        activeClass="active"
        to="card"
        smooth={true}
        spy={true}
        offset={-70}
        duration={500}
      >
        <div className="image-div">
          <img
            src={this.props.template.image}
            width="300"
            alt={this.props.template.name}
            onClick={() => this.onClick(name)}
          />
        </div>
      </Link>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    setTemplate: templateName => dispatch(setTemplate(templateName))
  }
}

export default connect(null, mapDispatch)(Template)
