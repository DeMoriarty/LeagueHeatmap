import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Controller from './Controller'
import Displayer from './Displayer'
import ChampFilter from './ChampFilter'

import positionData from '../../data/minimap3.json'
import './style.css'

export class Container extends Component {
  state = {
    positionData: JSON.parse(JSON.stringify(positionData)),
    currentFrame: 0,
    maxFrame: Math.max(...Object.values(positionData).map(value => {
      let keys = Object.keys(value)
      let max = keys[keys.length-1]
      if (max === undefined) max = '0'
      return Number(max)
    })),
    intervalID: null,
    paused: false,
    champList: Object.keys(positionData),
    activeItems: Object.keys(positionData),
  }
  tempCurrentFrame = 0;
  static propTypes = {

  }

  onPlay = (e) => {
    this.setState({
      paused: !this.state.paused,
    })
  }

  onStop = (e) => {
    this.setState({
      paused: true,
    })
  }

  onClick = (e, ref) => {
    ref.movementX = e.clientX - ref.sliderRef.current.getBoundingClientRect().left - ref.radius
    ref.value = (ref.movementX + ref.radius) / ref.barWidth;
    this.setState({ currentFrame: Math.round(ref.value * this.state.maxFrame) })
  }

  toggle = (e, name) => {
    if (this.state.activeItems.includes(name)) {
      this.setState({
        activeItems: [...this.state.activeItems.filter((value, index) => name !== value)]
      })
    } else {
      this.setState({
        activeItems: [name, ...this.state.activeItems]
      })
    }
  }

  onDrag = (e, ref) => {
    ref.radius = e.target.getBoundingClientRect().width / 2
    if (e.clientX !== 0) {
      ref.movementX = e.clientX - ref.initialX + ref.lastX
      if (ref.movementX < 0 - ref.radius) {
        ref.movementX = 0 - ref.radius;
      } else if (ref.movementX > ref.barWidth - ref.radius) {
        ref.movementX = ref.barWidth - ref.radius;
      }
      ref.value = (ref.movementX + ref.radius) / ref.barWidth;
      this.tempCurrentFrame = Math.round(ref.value * this.state.maxFrame)
      ref.setState({ handleStyle: { left: ref.movementX + 'px' } })
    }
  }

  onDragStart = (e) => {
    this.setState( {
      paused: true,
    } )
  }

  onDragEnd = (e) => {
    this.setState( {
      currentFrame: this.tempCurrentFrame,
      paused: false,
    } )
  }

  fastForward = (sec) => {
    let cFrame = this.state.currentFrame + 30 * sec
    if (cFrame > this.state.maxFrame) {
      cFrame = this.state.maxFrame
    } else if (cFrame < 0) {
      cFrame = 0
    }
    this.setState( {
      currentFrame: cFrame,
    } )
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState(prevState => {
        if (!this.state.paused) {
          if (prevState.currentFrame >= prevState.maxFrame) {
            prevState.paused = true
          } else {
            prevState.currentFrame += 1;
          }
          return prevState
        }
      })
      // if (this.state.currentFrame >= this.state.maxFrame) {
      //   clearInterval(this.state.intervalID)
      // }
    }, 1)
    this.setState({ intervalID: interval })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  render() {
    const { champList } = this.state
    return (
      <div className="container">
        <div className="flex-container">
          <ChampFilter
            champs={ champList.slice(0, 5) }
            float="left"
            toggle={ this.toggle }
          />
          <Displayer
            data={ this.state.positionData }
            frame={ this.state.currentFrame }
            activeItems = { this.state.activeItems }
          />
          <ChampFilter
            champs={ champList.slice(5, champList.length) }
            float="right"
            toggle={ this.toggle }
          />
        </div>
        <Controller
          onPlay={ this.onPlay }
          onClick={ this.onClick }
          onDrag={ this.onDrag }
          onDragEnd={ this.onDragEnd }
          onDragStart={ this.onDragStart }
          value={ this.state.currentFrame / this.state.maxFrame } 
          timeLength={ this.state.maxFrame/30 }
          currentTime={ this.state.currentFrame/30 }
          fforward={ this.fastForward }
        />
      </div>
    )
  }
}

export default Container
