import React from 'react'
import {fetchCard} from '../store/card'
import {connect} from 'react-redux'

class CardView extends React.Component {
  componentDidMount() {
    this.props.fetchCard(this.props.match.params.cardId)
  }

  render() {
    console.log('this.props.card', this.props.card)
    let card = this.props.card.card || {}
    let image = card.cardUrl
    return <img src={image} />
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
