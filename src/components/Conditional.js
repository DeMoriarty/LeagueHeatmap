import React, { Component } from 'react'

class Conditional extends Component {
  render() {
    const { isLoading } = this.props
    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          Can't load
        </div>
      )
    }
  }
}

export class ConditionalComp extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      })
    }, 1500)
  }

  render() {
    return (
      <div>
        <Conditional isLoading={ this.state.isLoading } />
      </div>
    )
  }
}

export default ConditionalComp
