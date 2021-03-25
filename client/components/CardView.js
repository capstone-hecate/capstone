import React from 'react'
import {fetchCard} from '../store/card'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'

class CardView extends React.Component {
  componentDidMount() {
    this.props.fetchCard(this.props.match.params.cardId)
  }

  render() {
    console.log('this.props.card', this.props.card)
    let card = this.props.card.card || {}
    let image = card.cardUrl
    return (
      <Container id="card-view">
        <img src={image} />
        <br />
        <Link to="/home">
          <Button variant="dark" type="button" id="card-view-button">
            Make your own card!
          </Button>
        </Link>
      </Container>
    )
  }
}

const mapState = state => {
  console.log('mapping state to props with state', state)
  return {
    card: state.card
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCard: id => dispatch(fetchCard(id))
  }
}

export default connect(mapState, mapDispatch)(CardView)
