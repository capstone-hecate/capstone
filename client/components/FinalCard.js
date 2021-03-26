import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {connect} from 'react-redux'
import {addUrl, sendEmail} from '../store/card'
import Button from 'react-bootstrap/Button'
import history from '../history'

class FinalCard extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {canvasUrl: {Url: ''}}
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    let canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    var img = new Image(600)
    let x, y

    let templates = {
      thankYou: {imgSrc: 'thankyou.jpg', fontColor: '#5f826d', x: 100, y: 175},
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
      ctx.drawImage(img, 0, 0, 600, 400)
      var lines = text.split('\n')
      for (var j = 0; j < lines.length; j++) {
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
      <Jumbotron id="final-card">
        <canvas ref={this.canvas} width="600" height="400" />
        <br />
        <Button variant="dark" onClick={this.onClick}>
          Send my card!
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            history.push('/')
          }}
        >
          Start over
        </Button>
      </Jumbotron>
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
