import React from 'react'

class ImageUploader extends React.Component {
  constructor() {
    super()
    this.state = {image: ''}
    this.onChange = this.onChange.bind(this)
  }

  onChange(file) {
    console.log(file.name)
    this.setState({image: file.name})
    console.log(this.state)
  }

  render() {
    return (
      <input
        type="file"
        id="cardImage"
        name="cardImage"
        onChange={e => this.onChange(e.target.files[0])}
      />
    )
  }
}

export default ImageUploader
