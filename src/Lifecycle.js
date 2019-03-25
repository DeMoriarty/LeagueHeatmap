import React, { Component } from 'react'

export class Lifecycle extends Component {

  componentDidMount() {
    // When component first mounted
    // Load data from apis,
    // Add event listener
  }

  // Deprecated
  UNSAFE_componentWillReceiveProps(nextProps) {
    // When component receive props from parent component
    if (nextProps.something !== this.props.something){
      // Do something
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Decide component should rerender
    // To improve performance
    // Return true if want to update, otherwise false
  }

  componentWillUnmount() {
    // Cleanup
    // Remove things like event listener
  }

  static getDerivedStateFromProps(props, state){
    // Return the new updated state based on the props
  }

  getSnapshotBeforeUpdate() {
    // Create a backup of current version
  }

  render() {
    // Render
    // should return JSX
    return (
      <div>
        This is render
      </div>
    )
  }
}

export default Lifecycle
