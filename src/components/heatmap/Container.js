import React, { Component } from 'react'
import './style.css'
import Data from '../../data/minimap3.json'

import Displayer from './Displayer'
import Controller from './Controller'

export class Container extends Component {
  state = {
    maxFrame: Math.max(...Object.values(Data).map(value => {
      let keys = Object.keys(value)
      let max = keys[keys.length-1]
      if (max === undefined) max = '0'
      return Number(max)
    })),
    size: [10, 10],
    from: 0,
    to: Math.max(...Object.values(Data).map(value => {
      let keys = Object.keys(value)
      let max = keys[keys.length-1]
      if (max === undefined) max = '0'
      return Number(max)
    })),
  }

  setFrom = (e) => {
    this.setState( {
      from: e.value,
    } )
  }

  setTo = (e) => {
    this.setState( {
      to: e.value,
    } )
  }
  setSize = (e) => {
    let {name, value} = e.target
    value = Number(value)
    console.log(this.state.size)
    if (name === "size") {
      this.setState( {
        size: [value,value]
      } )
    }
  }
  render() {
    const {size, maxFrame, from, to} = this.state
    return (
      <div className="hm-container">
        <Displayer
          data={Data["Illaoi"]}
          size={`${size[0]}x${size[1]}`}
          mode="gaussian"
          scheme="jet"
        />
        <Controller
          maxFrame={maxFrame}
          from={from}
          to={to}
          setFrom={this.setFrom}
          setTo={this.setTo}
          setSize={this.setSize}
        />
      </div>
    )
  }
}

export default Container
