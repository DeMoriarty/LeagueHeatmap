import React, { Component } from 'react'
import Header from './meme/header'
import Generator from './meme/generator'

export class MemeGenerator extends Component {
  render() {
    return (
      <div className="meme-container">
        <Header />
        <Generator/>
      </div>
    )
  }
}

export default MemeGenerator