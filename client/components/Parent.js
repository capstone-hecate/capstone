import React from 'react'
import {ChooseTemplate, Card, Empty, FinalCard} from './index'

class Parent extends React.Component {
  constructor() {
    super()
    this.state = {template: ''}
    this.selectTemplate = this.selectTemplate.bind(this)
    this.getTemplate = this.getTemplate.bind(this)
  }

  selectTemplate(template) {
    this.setState({template: template})
  }

  getTemplate() {
    return this.state.template
  }

  render() {
    console.log(this.state, 'Parent.js state')
    return (
      <>
        <ChooseTemplate
          selectTemplate={template => this.selectTemplate(template)}
        />
        <Empty />
        <Card template={this.state.template} />
        <Empty />
        <FinalCard template={this.state.template} />
      </>
    )
  }
}

export default Parent
