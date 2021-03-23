import React from 'react'
import {ChooseTemplate, Card, Empty, FinalCard} from './index'

class Parent extends React.Component {
  constructor() {
    super()
    this.state = {
      template: '',
      text: ''
    }
    this.selectTemplate = this.selectTemplate.bind(this)
  }

  selectTemplate(template) {
    this.setState({template: template})
  }
  setGeneratedText(text) {
    this.setState({text: text})
  }
  render() {
    console.log(this.state, 'Parent.js state')
    return (
      <>
        <ChooseTemplate
          selectTemplate={template => this.selectTemplate(template)}
        />
        <Empty />
        <Card
          template={this.state.template}
          setGeneratedText={text => this.setGeneratedText(text)}
        />
        <Empty />
        <FinalCard template={this.state.template} text={this.state.text} />
      </>
    )
  }
}

export default Parent
