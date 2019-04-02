import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class MatchListAdd extends Component {
  render() {
    return (
      <div
        className="btn btn-light matchlist-add"
      >
        <i
          className="fa fa-plus"
          style={ {
            position: "relative",
            left: 0,
            top: '12px',
          } }
        />
        <input
          className="matchlist-add-input"
          type="file"
          name="matchlist-addfile"
          id=""
          size="100"
          multiple="multiple"
          onChange={ this.props.addMatch }
        />
      </div>
    )
  }
}

export default MatchListAdd
