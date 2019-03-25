import React, { Component } from 'react'

export function ConditionalPractice(props) {
  let {status, onClick} = props
  return (
    <div>
      <button onClick={onClick}> { status ? "Log out" : "Log in" } </button>
      <p> { status ? "Logged in" : "Logged out" }</p>
    </div>
  )
}

export class Container extends Component {
  state = {
    status: false,
  }

  onClick = e => {
    this.setState( {
      status: !this.state.status
    } )
  }

  render() {
    return (
      <div> 
        <ConditionalPractice status={this.state.status} onClick={this.onClick}/>
      </div>
    )
  }
}



export default Container