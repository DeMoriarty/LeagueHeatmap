import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import Tooltip from './Tooltip'

const sliderStyle = {
  position: 'relative',
  width: "90%",
  left: "5%",
  height: 80,
}


function Handle({
  handle: { id, value, percent },
  getHandleProps,
}) {
  let [vis, setVis] = React.useState('hidden')
  let [down, setDown] = React.useState(false)
  const onEnter = e => {
    setVis("visible")
  }
  const onLeave = e => {
    if (!down) {
      setVis("hidden")
    } else {
      setVis("visible")
    }
  }
  const onDown = e => {
    setDown(true)
  }
  const onUp = e => {
    setDown(false)
  }

  return (
    <div
      className="range-slider-handle"
      style={ { left: `${percent}%` } }
      onMouseEnter={ onEnter }
      onMouseDown={ onDown }
      onMouseUp={ onUp }
      onMouseLeave={ onLeave }
      { ...getHandleProps(id) }
    >
      <Tooltip value={ value } visibility={ "visible" } />
    </div>)
}

function Track({ source, target, getTrackProps }) {
  const mouseDown = e => {
    let handles = document.querySelectorAll('.range-slider-handle')
    let rail = document.querySelector('.range-slider-rail')
    const {width, x} = rail.getBoundingClientRect()
  }
  return (
    <div
      className="range-slider-track"
      style={ {
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      } }
      { ...getTrackProps() }
    />
  )
}


export class RangeSlider extends Component {
  render() {
    const { max, from, to } = this.props
    return (
      <Slider
        rootStyle={ sliderStyle }
        domain={ [0, max] }
        values={ [from, to] }
        step={ 30 }
        mode={ 1 }
        onChange={ this.props.onChange }
      >
        <Rail>
          { ({ getRailProps }) => {
            return (
            <div className="range-slider-rail" { ...getRailProps() } />
          )} }
        </Rail>
        <Handles>
          { ({ handles, getHandleProps }) => (
            <div className="slider-handles">
              { handles.map(handle => (
                <Handle
                  key={ handle.id }
                  handle={ handle }
                  getHandleProps={ getHandleProps }
                />
              )) }
            </div>
          ) }
        </Handles>
        <Tracks right={ false } left={ false }>
          { ({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              { tracks.map(({ id, source, target }) => (
                <Track
                  key={ id }
                  source={ source }
                  target={ target }
                  getTrackProps={ getTrackProps }
                />
              )) }
            </div>
          ) }
        </Tracks>
      </Slider>
    )
  }
}

export default RangeSlider
