import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {connect} from 'react-redux'
import {addUrl, sendEmail} from '../store/card'
import Button from 'react-bootstrap/Button'

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
    if (this.props.template === 'thank-you') {
      img.src = 'thank-you.jpg'
      ctx.fillStyle = '#5f826d'
      x = 100
      y = 175
    }
    if (this.props.template === 'happy-birthday') {
      img.src = 'happy-birthday.jpg'
      ctx.fillStyle = '#8e77ab'
      x = 30
      y = 175
    }
    if (this.props.template === 'general') {
      img.src = 'general.jpg'
      ctx.fillStyle = 'black'
      x = 10
      y = 290
    }
    let text = this.props.text
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
    if (this.props.template === 'general') {
      let userImg = new Image(600, 270)

      // let blobUrl = this.props.card.imageUrl || ''
      // let blobData = blobUrl.data || []

      userImg.onload = () => {
        ctx.drawImage(userImg, 0, 0, 600, 270)
        let URL = canvas.toDataURL()
        this.setState({canvasUrl: {Url: URL}})
      }
    }
  }

  // componentDidUpdate() {
  //   let URL = canvas.toDataURL()
  //   if (this.state.canvasUrl.Url === '')
  //   this.setState({canvasUrl: {Url: URL}})
  // }

  onClick(e) {
    console.log(this.state.canvasUrl)
    this.props.addUrl(this.props.card.card, this.state.canvasUrl)
    this.props.sendEmail(this.props.card.card)
  }

  render() {
    console.log('this.props.card', this.props.card)

    return (
      <Jumbotron id="final-card">
        <canvas ref={this.canvas} width="600" height="400" />
        <br />
        <Button variant="dark" onClick={this.onClick}>
          Send my card!
        </Button>
      </Jumbotron>
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
    addUrl: (card, cardUrl) => dispatch(addUrl(card, cardUrl)),
    sendEmail: (card) => dispatch(sendEmail(card))
  }
}

export default connect(mapState, mapDispatch)(FinalCard)
