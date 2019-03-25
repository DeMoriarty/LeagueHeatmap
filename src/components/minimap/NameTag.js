import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export class NameTag extends Component {
  state = {
    rectWidth: 60,
    textRef: React.createRef()
  }

  static propTypes = {

  }

  componentDidMount() {
    const ref = this.state.textRef
    const width = ref.current.getComputedTextLength()
    // console.log(ref.current.getComputedTextLength())
    if (width > this.state.rectWidth -10) {
      this.setState({
        rectWidth: width+10,
      })
    }
  }

  render() {
    const { visibility, x, y, r, name } = this.props
    const height = 30;
    const fillColor = 'rgb(36, 36, 36)'
    const opacity = 0.8
    const triangle = `${x - 3}, ${y - height/2+ 1.5}
                      ${x + 3}, ${y - height/2 + 1.5}
                      ${x},   ${y - height/2 + 6.5 }
                      `
    return (
      <Fragment>
        <rect
          visibility={ visibility }
          x={ x - this.state.rectWidth / 2 }
          y={ y - height / 2 - r * 2 }
          rx="5px"
          ry="5px"
          width={ this.state.rectWidth }
          height={ height }
          fill={ fillColor }
          opacity={opacity}
        > </rect>
        <polygon
          points={ triangle }
          fill={ fillColor }
          visibility={ visibility }
          opacity={opacity}
        > </polygon>
        <text
          x={ x }
          y={ y - height / 2 - r/2 }
          textAnchor="middle"
          fill='white'
          visibility={ visibility }
          ref={ this.state.textRef }
          opacity={opacity}
        >
          { name }
        </text>
      </Fragment>
    )
  }
}

export default NameTag
