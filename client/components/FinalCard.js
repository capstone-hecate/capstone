import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

class FinalCard extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidUpdate() {
    console.log('inside componentDidMount')
    const canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    var img = new Image(600)
    let x
    let y
    if (this.props.template === 'thank-you') {
      img.src = 'thank-you.jpg'
      ctx.fillStyle = '#5f826d'
      x = 175
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
      x = 150
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
    }
    if (this.props.template === 'general') {
      let userImg = new Image(600, 270)
      //jpg = placeholder
      userImg.src = 'happy-birthday.jpg'
      userImg.onload = () => {
        ctx.drawImage(userImg, 0, 0, 600, 270)
      }
    }
  }

  render() {
    return (
      <Jumbotron id="final-card">
        <canvas ref={this.canvas} width="600" height="400" />
      </Jumbotron>
    )
  }
}

export default FinalCard
