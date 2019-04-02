import React, { Component } from 'react'

export class GridCell extends Component {
  state = {
    fill: 'black',
  }

  gaussian = (x, cx, sigma = 0.17) => {
    return Math.exp((-0.5 * Math.pow((x - cx) / sigma, 2)))
  }

  setColor = (value, scheme = "jet") => {
    let fill = "white"
    if (scheme === "grayscale") {
      fill = `rgba(${255 * value}, ${255 * value}, ${255 * value}, 0.8)`
    } else if (scheme === "jet") {
      fill = `rgba(${this.gaussian(value, 0.75) * 255}, 
                  ${this.gaussian(value, 0.5) * 255},
                  ${this.gaussian(value, 0.25) * 255},
                  ${this.gaussian(value, 1, 0.75)})`
    }
    this.setState({ fill })
  }

  componentDidMount() {
    const { value, x, y, scheme } = this.props
    this.setColor(value, scheme)
  }

  componentWillReceiveProps(nextProps) {
    const { x, y, value, scheme } = nextProps
    if (value !== this.props.value
      || scheme !== this.props.scheme) {
      this.setColor(value, scheme)
    }
  }
  render() {
    const { x, y, width, height, stroke } = this.props
    return (
      <rect
        width={ width }
        height={ height }
        x={ x * width }
        y={ y * height }
        fill={ this.state.fill }
        stroke={ stroke }
      />
    )
  }
}

export default GridCell
