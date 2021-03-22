import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

class FinalCard extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    var img = new Image(600)
    img.src = 'thank-you.jpg'
    let text = `Dear Friend,\nelses paper every man is necessary to\nend may and wisdom often miss the\nbeen always said\nLove, Friend`
    ctx.font = '20px Sans Serif'

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 600, 400)
      var lines = text.split('\n')
      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], 175, 175 + j * 25)
      }
    }
  }

  render() {
    return (
      <Jumbotron>
        <canvas ref={this.canvas} width="600" height="400" />
      </Jumbotron>
    )
  }
}

export default FinalCard
