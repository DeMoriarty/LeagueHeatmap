import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from './Slider'

export class Controller extends Component {
  static propTypes = {

  }

  // Seconds => Hours:Minutes:Seconds
  sec2hms = (time) => {
    let sec = time % 60;
    time = (time - sec) / 60;
    let min = time % 60;
    time = (time - min) / 60;
    sec = Math.round(sec)
    min = Math.round(min)
    time = Math.round(time)
    sec = sec > 9 ? `${sec}` : `0${sec}`
    min = min > 9 ? `${min}` : `0${min}`
    time = time > 9 ? `${time}` : `0${time}`
    if (time === '00') {
      return `${min}:${sec}`
    } else {
      return `${time}:${min}:${sec}`
    }
  }
  state = {
    playText: <i className="fa fa-pause"></i>,
    buttonClass: 'pause-button'
  }

  componentWillMount() {
    let ref = this
    window.addEventListener('keydown', e => {
      let keyCode = e.keyCode? e.keyCode : e.which
      console.log(keyCode)
      switch (keyCode){
        case 32:
          e.preventDefault()
          ref.onClick(e)
          break
        case 37:
          e.preventDefault()
          ref.props.fforward(-5)
          break
        case 39:
          e.preventDefault()
          ref.props.fforward(5)
          break
        default:
       }
    })
  }

  onClick = e => {
    if (this.state.buttonClass === 'pause-button') {
      this.setState({
        playText: <i className="fa fa-play"></i>,
        buttonClass: 'play-button',
      })
    } else {
      this.setState({
        playText: <i className="fa fa-pause"></i>,
        buttonClass: 'pause-button',
      })
    }
    this.props.onPlay(e)
  }

  render() {
    return (
      <div className="controller">
        <Slider
          onClick={ this.props.onClick }
          onDrag={ this.props.onDrag }
          onDragEnd={ this.props.onDragEnd }
          onDragStart={ this.props.onDragStart }
          value={ this.props.value }
        />
        <button
          className={ this.state.buttonClass }
          onClick={ this.onClick }
        >
          { this.state.playText }
        </button>
        <p
         className="controller-time"
        >
          { this.sec2hms(this.props.currentTime) } / { this.sec2hms(this.props.timeLength) }
        </p>
      </div>
    )
  }
}

export default Controller
