import React, { Component } from 'react'
import backgroundImage from '../../data/minimap2.png'
import backgroundImage2 from '../../data/minimap3.png'
import Grid from './Grid'
var w = 350
export class Displayer extends Component {
  state = {
    width: w,
    height: w,
  }

  render() {
    return (
      <div className="hm-displayer" style={ this.state.imgStyle }>
        <svg
          height={ this.state.height }
          width={ this.state.width }
        >
          <rect
            x="0"
            y="0"
            width={ this.state.width }
            height={ this.state.height }
            fill="#ffd"
          />
          {/* <image
              xlinkHref={backgroundImage2}
              x='0'
              y='0'
              height={this.state.height}
              width={this.state.width}
            ></image> */}
          <Grid
            width={ this.state.width }
            height={ this.state.height }
            size={ this.props.size }
            data={ this.props.data }
            mode={ this.props.mode }
            scheme={ this.props.scheme }
          />
          <image
            xlinkHref={ backgroundImage2 }
            x='0'
            y='0'
            height={ this.state.height }
            width={ this.state.width }
          ></image>
        </svg>
      </div>
    )
  }
}

export default Displayer
