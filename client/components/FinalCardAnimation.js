import React from 'react';
import {Motion, spring} from 'react-motion';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  };

  handleMouseDown = () => {
    this.setState({open: !this.state.open});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };

  render() {
    return (
      <div>
        <Motion style={{x: spring(this.state.open ? -600 : 0)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
            <>
            <img
              src ='thank-you.jpg' className='test-image'/>
              <div
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}
                className="envelope" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}>
                <div className='envelope-text'>A card from So-And-So<br />Click me to open</div>
              </div>
            </>
          }
        </Motion>

      </div>
    );
  };
}
