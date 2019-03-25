import React, { Component } from 'react'
import Todos from './todolist/Todos'
import Title from './todolist/Title'
import TodoData from '../data/TodoData'
import { setTimeout } from 'timers';

export class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      TodoData,
      Character: { name: 'Loading' },
      maxKey: TodoData.length,
    }
  }
  componentDidMount() {
    // 1st method: fetch
    fetch("https://swapi.co/api/people/1")
      .then(res => res.json())
      .then(data => {
        this.setState({
          Character: data,
        })
      })
  }

  onChange = (e, id) => {
    this.setState(prevState => {
      return {
        TodoData: [...prevState.TodoData.map(item => {
          item.completed = item.id === id ? !item.completed : item.completed;
          return item
        })]
      }
    })
  }

  addTodo = (e, state) => {
    e.preventDefault()
    let { text, id, completed, isNew } = state
    id = this.state.maxKey + 1
    let newState = { text, id, completed, isNew }
    if (state.text !== '') {
      // setTimeout(() => {
      //   this.setState({
      //     TodoData: [newState, ...this.state.TodoData],
      //     maxKey : this.state.maxKey + 1  
      //   })
      // }, 1000)
      this.setState({
        TodoData: [ newState, ...this.state.TodoData],
        maxKey: this.state.maxKey + 1
      })
    }
  }

  delTodo = (e, id) => {
    setTimeout(() => {
      this.setState({
        TodoData: [...this.state.TodoData.filter(item => {
          return item.id === id ? false : true
        })],
      })
    }
      , 1000)
  }

  render() {
    console.log(this.state.maxKey)
    return (
      <div>
        <Title />
        <Todos data={ this.state.TodoData } onChange={ this.onChange } addTodo={ this.addTodo } delTodo={ this.delTodo } />
      </div>
    )
  }
}

export default TodoList
