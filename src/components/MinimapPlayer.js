import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Container from './minimap/Container'
import Todos from './minimap/Todo'

export class MinimapPlayer extends Component {
  static propTypes = {

  }

  render() {
    return (
      <React.Fragment>
        <Container />
        <Todos />
      </React.Fragment>
    )
  }
}

export default MinimapPlayer
