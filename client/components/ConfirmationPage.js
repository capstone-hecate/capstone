import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class ConfirmationPage extends React.Component {
  render() {
    return (
      <Jumbotron id="confirmation-page">
        <h2 className="centered-header">Your card has been sent!</h2>
        <div className="button-container">
          <Link to="/home">
            <Button variant="dark">Make another!</Button>
          </Link>
        </div>
        {this.props.isLoggedIn ? (
          <p className="centered-header">
            <Link to="/user/cards">Click here</Link> to see your cards.
          </p>
        ) : (
          <p className="centered-header">
            <Link to="/signup">Sign up</Link> to save your cards.
          </p>
        )}
      </Jumbotron>
    )
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(ConfirmationPage)
