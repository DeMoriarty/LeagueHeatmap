import React, { Component } from 'react'

export class Controller extends Component {
  render() {
    return (
      <div className="hm-controller">
        <label>
          From 
          <input
            type="text"
            name="from"
            id=""
            value={ this.props.from }
            onChange={ this.props.setFrom }
          />
        </label>
        <br/>
        <label>
          to
          <input
            type="text"
            name="to"
            id=""
            value={ this.props.to }
            onChange={ this.props.setTo }
          />
        </label>
        <br/>
        <label>
          20
          <input
            type="range"
            name="size"
            id=""
            min="20"
            max="100"
            onChange={ this.props.setSize }
          />
          100
        </label>
      </div>
    )
  }
}

export default Controller
