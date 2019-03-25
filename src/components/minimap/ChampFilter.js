import React, { Component } from 'react'
import {default as Item} from './FilterItem'

export class ChampFilter extends Component {
  render() {
    const { champs, float ,toggle } = this.props
    const items = champs.map( (value, index, array) => (
      <Item key={index} champ={value} toggle={toggle} index={index} float={float}/>
     )
    )
    return (
      <div className="champfilter-container"
        style={{float}}
      >
        {items}
      </div>
    )
  }
}

export default ChampFilter
