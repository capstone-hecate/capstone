import React from 'react'

import {
  Navbar,
  ChooseTemplate,
  Card,
  Empty,
  FinalCard,
  Parent
} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
