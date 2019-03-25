import React, { Component } from 'react'

export class DelTodo extends Component {
  state = {
    style: {
      display: 'flex',
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
    },
    buttonStyle: {
      background: 'red',
      border: 'none',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      color: 'white',
      cursor: 'pointer',
    }
  }
  render() {
    return (
      <div style={this.state.style}>
        <button style={this.state.buttonStyle} onClick={ e => {this.props.delTodo(e, this.props.id)} } >x</button>
      </div>
    )
  }
}

export default DelTodo
