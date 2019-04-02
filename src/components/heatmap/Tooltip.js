import React from 'react'
import {f2t} from './util'

export default function Tooltip(props) {
  const { value, visibility } = props
  return (
    <React.Fragment>
      <div
        className="hm-tooltip"
        style={ { visibility } }
      >
        { f2t(value) }
      </div>
      <div className="hm-tooltip-arrow"/>
    </React.Fragment>
  )
}
