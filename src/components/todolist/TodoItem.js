import React, { Component } from 'react'
import DelTodo from './DelTodo'

export class TodoItem extends Component {
  state = {
    className: 'todo-item',
  }
  delAnimation = () => {
    this.setState({
      className: this.state.className + ' delete-todo'
    })
  }

  componentDidMount() {
    if (this.props.data.isNew) {
      this.setState({
        className: this.state.className + ' add-todo'
      })
      setTimeout( ()=>{
        this.setState( {
          className: 'todo-item'
        } )
      }, 1000)
    }
  }

  // setState(props.data)
  render() {
    const { text, completed, id } = this.props.data
    const { onChange } = this.props
    const style = {
      textDecoration: completed ? "line-through" : "none",
      fontStyle: completed ? "italic" : "normal",
      color: completed ? "gray" : "black"
    }
    
    return (
      <div className={ this.state.className }>
        <label htmlFor="">
          <input type="checkbox" name="todo" id={ this.props.id } checked={ completed } onChange={ (e) => onChange(e, id) } />
          <span style={ style }>{ text }</span>
        </label>
        <DelTodo id={ id } delTodo={ (e, id) => {
          this.props.delTodo(e, id)
          this.delAnimation()
        } } />
      </div>
    )
  }
}

export default TodoItem