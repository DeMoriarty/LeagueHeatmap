import React, { Component } from 'react'
import './style.css'

export class generator extends Component {
  state = {
    topText: '',
    bottomText: '',
    image: '',
  }

  componentWillMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(json => {
        const allImgs = json.data.memes
        const randomIndex = Math.round(Math.random() * allImgs.length)
        this.setState({
          image: allImgs[randomIndex].url
        })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState( {
      [name] : value,
    } )
  }

  render() {
    console.log(this.state.image)
    return (
      <div>
        <form action="">
          <input 
            type="text" 
            name="topText" 
            placeholder="Enter Top Text"
            value = {this.state.topText}
            onChange={this.handleChange}
          />
          <input 
            type="text" 
            name="bottomText" 
            placeholder="Enter Bottom Text"
            value = {this.state.bottomText}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Generate</button>
        </form>
        <p className="top-text"> {this.state.topText} </p>
        <p className="bottom-text"> {this.state.bottomText} </p>
        <img className="meme-image" src={this.state.image} alt="lost"/>
      </div>
    )
  }
}

export default generator