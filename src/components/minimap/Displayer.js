import React, { Component } from 'react'
import PropTypes from 'prop-types'

import backgroundImage from '../../data/minimap.png'
import Track from './Track'

export class Displayer extends Component {
  static propTypes = {

  }

  containerRef = React.createRef()
  state = {
    width: 350,
    height: 350,
    data: [],
    activeItems: [],
  }
  
  componentWillMount() {
    window.addEventListener("resize", this.resize);
    window.addEventListener("load", this.resize)
  }

  componentWillReceiveProps(nextProps) {
    this.setState( {
      data: Object.entries(this.props.data),
      activeItems: nextProps.activeItems,
    } )
  }

  resize = () => { 
    const {width} = this.containerRef.current.getBoundingClientRect()
    this.setState( {
      width: width - 20,
      height: width - 20
    } )
  }


  render() {
    const items = this.state.data.map( (obj, index) =>{
      return <Track
                name={obj[0]}
                data={obj[1]}
                key={obj[0]}
                frame={this.props.frame}
                height={this.state.height}
                width={this.state.width}
                id={index}
                enabled={ this.state.activeItems.includes(obj[0])}
                // focusItem={this.toggle}
              />
    })
    return (
      <div className="displayer" ref={this.containerRef}>
        <svg height={this.state.height} width={this.state.width}>
          <image
            xlinkHref={backgroundImage}
            x='0'
            y='0'
            height={this.state.height}
            width={this.state.width}
          ></image>
          {items}
        </svg>
      </div>
    )
  }
}

export default Displayer
