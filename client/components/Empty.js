import React from 'react'
import {connect} from 'react-redux'

const Empty = (props) => {
  let template = props.template || {}
  let image = template.image || ''
  return (
  <div className="empty-div"
  style= {{backgroundImage: `url(${image})`}}/>
  )
}
const mapState = state => {
  return {
    template: state.template.template
  }
}

export default connect(mapState)(Empty)
