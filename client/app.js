import React from 'react'

import {Navbar, ChooseTemplate, Card, Empty, FinalCard} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <ChooseTemplate />
      <Empty />
      <Card />
      <Empty />
      <FinalCard />
      <Routes />
    </div>
  )
}

export default App
