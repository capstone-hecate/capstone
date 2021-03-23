import React from 'react'
import {ChooseTemplate, Card, Empty, FinalCard} from './index'

// Mixing class components with functional (hook) components

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
    return (
      <>
        <ChooseTemplate
          selectTemplate={template => this.selectTemplate(template)}
        />
        <Empty />
        <Card getTemplate={this.getTemplate} /> // replace getTemplate with this.state.template
        <Empty />
        <FinalCard />
      </>
    )
  }
}

export default Parent
