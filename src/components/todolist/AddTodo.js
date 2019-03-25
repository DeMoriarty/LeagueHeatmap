import React, { Component } from 'react'
import { timingSafeEqual } from 'crypto';

export class AddTodo extends Component {
  state = {
    text: '',
    completed: false,
    id: 0,
    isNew: true,
    textbarStyle: {
      width: '65%',
      marginRight: '10px',

    },
    buttonStyle: {
      width: '20px',
      height: '20px',
      border: 'none',
      borderRadius: '50%',
      background: 'green',
      color: 'white',
      cursor: 'pointer',
    }
  }
  handleChange = e => {
    const text = e.target.value
    this.setState( {
      text
    } )
  }
  
  clear = () => {
    this.setState( {
      text: '',
      completed: false,
      id: 0,
      isNew: true,
    } )
  }

  render() {
    return (
      <div style={{position:'relative', width:'100%'}}>
        <form>
          <input type="text" name="add" id="" placeholder="Enter new todo item" onChange={this.handleChange} value={this.state.text} style={this.state.textbarStyle}/>
          <button onClick={ e => {
              this.props.addTodo(e, this.state)
              this.clear()
            } } style={this.state.buttonStyle}>+</button>
        </form>
      </div>
    )
  }
}

export default AddTodo
