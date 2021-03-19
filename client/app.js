import React from 'react'

import {Navbar, ChooseTemplate, Card, Empty} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <ChooseTemplate />
      <Empty />
      <Card />
      <Routes />
    </div>
  )
}

export default App
