import React, { Component } from 'react'
import {default as Item} from './TodoItem'
import AddTodo from './AddTodo'

export class Todos extends Component {
  render() {
    const {data, onChange, } = this.props
    const items = data.map(item=>{
      return <Item data={item} key={item.id} onChange={onChange} delTodo={this.props.delTodo}/>
    })
    return (
      <div className="todo-list">
        <AddTodo addTodo={this.props.addTodo}/>
        {items}
      </div>
    )
  }
}

export default Todos
