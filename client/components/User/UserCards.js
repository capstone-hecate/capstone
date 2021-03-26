import React from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import { getUserCards } from '../../store/userCards'

class UserCards extends React.Component {
  componentDidMount() {
    this.props.loadUserCards(this.props.user.id)
  }
  render(){
    let user = this.props.userCards || {}
    let cards = user.cards || []
    console.log(this.props)
    return(
      <>
      <h3 className='centered-header'>Cards you've sent:</h3>
      <div className='user-cards'>
      {cards.filter(card => card.cardUrl).map(card => {
        return(
          <img width='400' src={card.cardUrl} key={card.id}/>
        )
      })}
      </div>
      </>
    )
  }
}

const mapState = state => {
  return {
    userCards: state.userCards,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadUserCards: (userId) => dispatch(getUserCards(userId))
  }
}

export default connect(mapState, mapDispatch)(UserCards)
