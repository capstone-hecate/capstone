import React from 'react'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {addUrl, sendEmail} from '../store/card'
import Button from 'react-bootstrap/Button'
import history from '../history'
import {Motion, spring} from 'react-motion';


class FinalCard extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {canvasUrl: {Url: ''}, open: false}
    this.onClick = this.onClick.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown = () => {
    this.setState({open: !this.state.open});
  };

  // is there any way to break up this function?
  componentDidMount() {
    let canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    var img = new Image(600)
    let x, y

    let templates = {
      thankYou: {imgSrc: 'thank-you.jpg', fontColor: '#5f826d', x: 100, y: 175},
      happyBirthday: {
        imgSrc: 'happy-birthday.jpg',
        fontColor: '#a45464',
        x: 30,
        y: 175
      },
      general: {imgSrc: 'general.jpg', fontColor: 'black', x: 25, y: 290},
      floral: {imgSrc: 'floral.jpg', fontColor: 'white', x: 35, y: 150},
      congrats: {imgSrc: 'congrats.jpg', fontColor: 'white', x: 75, y: 250},
      getWell: {imgSrc: 'get-well.jpg', fontColor: '#1a432c', x: 75, y: 250}
    }

    img.src = templates[this.props.template.template].imgSrc
    ctx.fillStyle = templates[this.props.template.template].fontColor
    x = templates[this.props.template.template].x
    y = templates[this.props.template.template].y

    let cardContainer = this.props.card || {}
    let card = cardContainer.card || {}
    let text = card.text || ''
    ctx.font = '20px Sans Serif'

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 600, 434.11)
      var lines = text.split('\n') // replace with const
      for (var j = 0; j < lines.length; j++) { // replace with let
        ctx.fillText(lines[j], x, y + j * 25)
      }
      let URL = canvas.toDataURL() 
      this.setState({canvasUrl: {Url: URL}})
    }
    if (this.props.template.template === 'general') {
      let userImg = new Image(600, 270)

      userImg.src = localStorage.getItem('currentImage')

      userImg.onload = () => {
        ctx.drawImage(userImg, 0, 0, 600, 270)
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
          {({x}) =>
            <>
              <canvas ref={this.canvas} width="600" height='434.11' />
              <div
                onMouseDown={this.handleMouseDown}
                className="envelope" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}>
                <div className='envelope-text'>A card from {this.props.card.card.name}<br />Click me to open</div>
              </div>
            </>
          }
        </Motion>
        <br />
        <Button className='final-card-button' variant="dark" onClick={this.onClick}>
          Send my card!
        </Button>
        <Button
          className='final-card-button'
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
    template: state.template
  }
}

const mapDispatch = dispatch => {
  return {
    addUrl: (card, cardUrl) => dispatch(addUrl(card, cardUrl)),
    sendEmail: card => dispatch(sendEmail(card))
  }
}

export default connect(mapState, mapDispatch)(FinalCard)
