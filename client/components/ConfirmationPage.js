import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'


class ConfirmationPage extends React.Component {
  render() {
    return (
      <Jumbotron id="confirmation-page">
        <h2>Your card has been sent!</h2>
        <Link to="/home">
          <Button variant="dark">
            Make another!
          </Button>
        </Link>
      </Jumbotron>
    )
  }
}

export default ConfirmationPage
