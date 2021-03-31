import React from 'react'
import { ChooseTemplate, Card, Empty } from './index'

class Parent extends React.Component {
  render() {
    return (
      <>
        <ChooseTemplate />
        <Empty />
        <Card />
      </>
    )
  }
}

export default Parent
