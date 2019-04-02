import React, { Component } from 'react'
import backgroundImage from '../../data/minimap2.png'
import backgroundImage2 from '../../data/minimap3.png'
import Grid from './Grid'
import Container from 'react-bootstrap/Container'

var w = 350
export class Displayer extends Component {
  state = {
    width: w,
    height: w,
  }

  render() {
    return (
      <Container fluid className="pr-0 pl-0"style={{backgroundColor:"black"}}>
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
            <Grid
              width={ this.state.width }
              height={ this.state.height }
              size={ this.props.size }
              data={ this.props.data }
              champs={ this.props.champs }
              mode={ this.props.mode }
              scheme={ this.props.scheme }
              from={ this.props.from }
              to={ this.props.to }
            />
            <image
              xlinkHref={ backgroundImage2 }
              x='0'
              y='0'
              height={ this.state.height }
              width={ this.state.width }
            ></image>
          </svg>
      </Container>
    )
  }
}

export default Displayer
