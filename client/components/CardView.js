import React from 'react'
import {fetchCard} from '../store/card'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
import {Motion, spring} from 'react-motion'

class CardView extends React.Component {
  constructor() {
    super()
    this.state = {open: false}
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }
  componentDidMount() {
    this.props.fetchCard(this.props.match.params.cardId)
  }

  handleMouseDown = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    let card = this.props.card.card || {}
    let image = card.cardUrl
    return (
      <Container id="card-view">
        <Motion style={{x: spring(this.state.open ? -650 : 0)}}>
          {({x}) => (
            <>
              <img className="card-view" src={image} />
              <div
                onMouseDown={this.handleMouseDown}
                className="envelope"
                style={{
                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                  transform: `translate3d(${x}px, 0, 0)`
                }}
              >
                <div className="envelope-text">
                  A card from {card.name}
                  <br />Click me to open
                </div>
              </div>
            </>
          )}
        </Motion>
        <br />
        <Link to="/home">
          <Button className="final-card-button" variant="dark" type="button">
            Make your own card!
          </Button>
        </Link>
      </Container>
    )
  }
}

const mapState = state => {
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
