import React, { Component } from 'react'

export class Forms extends Component {
  state = {
    firstName : "",
    lastName: '',
  }

  onChange = e => {
    this.setState( {
      [e.target.name]: e.target.value
    } )
  }
  render() {
    return (
      <div>
        <form>
          <input type="text" name="firstName" placeholder="First Name" onChange={this.onChange}/>
          <br/>
          <input type="text" name="lastName" placeholder="Last Name" onChange={this.onChange}/>
          <br/>
          <textarea name="" id="" cols="30" rows="10" />
          <br/>
          <label htmlFor="">
            <input type="checkbox" name="checkbox" id=""/>
            Are you over age 18
          </label>
          <br/>
          <label htmlFor="">
            <input type="radio" name="gender" id="" value="male"/>
            Male
          </label>
          <label htmlFor="">
            <input type="radio" name="gender" value="female"/>
            Female
          </label>
          <br/>
          <label htmlFor=""> Favorite color </label>
          <select name="color" id="">
            color
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
          <br/>
          <button>Submit</button>
        </form>
        <p>Hello, Mr. {this.state.firstName} {this.state.lastName}</p>
      </div>
    )
  }
}

export default Forms
