import React from 'React'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {template: '', clicked: false}
    this.onClick = this.onClick.bind(this)
  }

  onClick(templateName) {
    this.setState({template: templateName, clicked: !this.state.clicked})
    console.log(this.state)
  }

  render() {
    let name = this.props.template.name
    return (
      <img
        src={this.props.template.image}
        width="300"
        alt={this.props.template.name}
        onClick={() => this.onClick({name})}
        className={this.state.clicked ? 'bordered-image' : ''}
      />
    )
  }
}

export default Template
