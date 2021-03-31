import React from 'react'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {addUrl, sendEmail} from '../store/card'
import Button from 'react-bootstrap/Button'
import history from '../history'
import {Motion, spring} from 'react-motion'
import {templates} from './utils'

class FinalCard extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {canvasUrl: {Url: ''}, open: false}
    this.onClick = this.onClick.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown = () => {
    this.setState({open: !this.state.open})
  }

  componentDidMount() {
    let canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    var img = new Image(600)
    let x, y
    const templateName = this.props.template.name

    img.src = templates[templateName].imgSrc
    ctx.fillStyle = templates[templateName].fontColor
    x = templates[templateName].x
    y = templates[templateName].y

    let cardContainer = this.props.card || {}
    let card = cardContainer.card || {}
    let text = card.text || ''
    ctx.font = '20px Sans Serif'

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 600, 434.11)
      var lines = text.split('\n')
      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], x, y + j * 25)
      }
      let URL = canvas.toDataURL()
      this.setState({canvasUrl: {Url: URL}})
    }
    if (templateName === 'general') {
      let userImg = new Image(600, 300)

      userImg.src = localStorage.getItem('currentImage')

      userImg.onload = () => {
        ctx.drawImage(userImg, 0, 0, 600, 300)
        let URL = canvas.toDataURL()
        this.setState({canvasUrl: {Url: URL}})
      }
    }
  }

  onClick(e) {
    this.props.addUrl(this.props.card.card, this.state.canvasUrl)
    this.props.sendEmail(this.props.card.card)
    history.push('/confirmation')
  }

  render() {
    return (
      <Container id="final-card">
        <Motion style={{x: spring(this.state.open ? -650 : 0)}}>
          {({x}) => (
            <>
              <canvas ref={this.canvas} width="600" height="434.11" />
              <div
                onMouseDown={this.handleMouseDown}
                className="envelope"
                style={{
                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                  transform: `translate3d(${x}px, 0, 0)`
                }}
              >
                <div className="envelope-text">
                  A card from {this.props.card.card.name}
                  <br />Click me to open
                </div>
              </div>
            </>
          )}
        </Motion>
        <br />
        <Button
          className="final-card-button"
          variant="dark"
          onClick={this.onClick}
        >
          Send my card!
        </Button>
        <Button
          className="final-card-button"
          variant="dark"
          onClick={() => {
            history.push('/')
          }}
        >
          Start over
        </Button>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    card: state.card,
    template: state.template.template
  }
}

const mapDispatch = dispatch => {
  return {
    addUrl: (card, cardUrl) => dispatch(addUrl(card, cardUrl)),
    sendEmail: card => dispatch(sendEmail(card))
  }
}

export default connect(mapState, mapDispatch)(FinalCard)
