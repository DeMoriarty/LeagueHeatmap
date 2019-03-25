import React, { Component } from 'react'

export class FormPractice extends Component {
  state = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    destination: '',
    restriction: {
      vegan: false,
      kosher: false,
      lactose: false
    },
  }
  handleChange = e => {
    const { type, name, value, checked} = e.target
    if (type === 'checkbox') { 
      console.log(name, checked)
      this.setState( prevState => {
        prevState.restriction[name] = checked
        return prevState
      })
    } else {
      this.setState({
        [name]: value,
      })
    }
  }
  render() {
    return (
      <div>
        <form action="">
          <input type="text" name="firstName" placeholder="First Name" onChange={ this.handleChange } />
          <br />
          <input type="text" name="lastName" placeholder="Last Name" onChange={ this.handleChange } />
          <br />
          <input type="number" name="age" placeholder="Age" onChange={ this.handleChange } />
          <br />
          <label htmlFor="">
            <input type="radio" name="gender" value="male" onChange={ this.handleChange } />
            Male
          </label>
          <label htmlFor="">
            <input type="radio" name="gender" value="female" onChange={ this.handleChange } />
            Female
          </label>
          <br />
          <label htmlFor="">Choose your destination</label>
          <select name="destination" id="" onChange={ this.handleChange }>
            <option value="none">Please choose a destination</option>
            <option value="New York">New York</option>
            <option value="Kairo">Kairo</option>
            <option value="Paris">Paris</option>
          </select>
          <br />
          <label htmlFor=""><input type="checkbox" name="vegan" onChange={this.handleChange } checked={this.state.restriction.vegan}/>Vegan?</label>
          <br/>
          <label htmlFor=""><input type="checkbox" name="kosher" onChange={this.handleChange} checked={this.state.restriction.kosher}/>Kosher?</label>
          <br/>
          <label htmlFor=""><input type="checkbox" name="lactose" onChange={this.handleChange} checked={this.state.restriction.lactose}/>Lactose Free?</label>
          <br/>
          <button>Submit</button>
        </form>
        <hr />
        <h3>Entered Information</h3>
        <p>Your name: { this.state.firstName } { this.state.lastName }</p>
        <p>Your age: { this.state.age }</p>
        <p>Your gender: { this.state.gender }</p>
        <p>You want to go: { this.state.destination }</p>
        <h3>Dietery Restirctions:</h3>
        <p>Vegan: {this.state.restriction.vegan ? 'yes' : 'no'}</p>
        <p>Kosher: {this.state.restriction.kosher ? 'yes' : 'no'} </p>
        <p>Lactose Free: {this.state.restriction.lactose ? 'yes': 'no'}</p>
      </div>
    )
  }
}

export default FormPractice
