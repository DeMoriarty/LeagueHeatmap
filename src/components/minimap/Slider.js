import React, { Component } from 'react'

export class Slider extends Component {
  lastX = 0;
  initialX = 0;
  movementX = 0;
  barWidth = 0;
  radius = 0;
  value = 0;
  sliderRef = React.createRef()
  handleRef = React.createRef()

  state = {
    handleStyle: {
      left: '-10px'
    },
    barStyle: {
      height: '2px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginBottom: '20px'
    },
    dragging: false,
  }

  onDragStart = (e) => {
    this.props.onDragStart(e)
    const root = document.getElementById('root')
    root.style.pointerEvents = 'auto'
    root.style.cursor = 'pointer'
    let clone = e.target.cloneNode(true);
    clone.style.visibility = "hidden";
    e.dataTransfer.setDragImage(clone, 0, 0)
    this.initialX = e.clientX
    this.setState({
      dragging: true,
    })
  }
  onDragEnd = (e) => {
    const root = document.getElementById('root')
    root.style.cursor = 'auto'
    this.lastX = this.movementX
    this.setState({
      dragging: false,
    })
    this.props.onDragEnd(e)
  }

  onMouseEnter = (e) => {
    this.setState({
      barStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: '4px',
        marginBottom: '18px',
        top: '-1px',
      }
    })
  }

  onMouseLeave = (e) => {
    this.setState({
      barStyle: {
        height: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: '20px'
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.value = nextProps.value
      this.movementX = this.value * this.barWidth - this.radius
      if (!this.state.dragging) {
        this.setState({ handleStyle: { left: this.movementX + 'px' } })
      }
    }
  }

  componentDidMount() {
    this.barWidth = this.sliderRef.current.getBoundingClientRect().width
    this.radius = this.handleRef.current.getBoundingClientRect().width / 2
  }

  render() {
    return (
      <div className="slider-container" ref={ this.sliderRef }>
        <div className="slider-bar" style={ this.state.barStyle }> </div>
        <div
          className="slider-bbox"
          onMouseEnter={ this.onMouseEnter }
          onMouseLeave={ this.onMouseLeave }
          onClick={ e => {
            this.props.onClick(e, this)
          } }> </div>
        <div
          className="slider-handle"
          draggable="true"
          onDrag={ e => {
            this.props.onDrag(e, this)
          } }
          onDragStart={ this.onDragStart }
          onDragEnd={ this.onDragEnd }
          style={ this.state.handleStyle }
          ref={ this.handleRef }
        >
        </div>
      </div>
    )
  }
}

export default Slider
