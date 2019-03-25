import React, { Component } from 'react'
import { ContactCard as Card } from './ContactCard'

export class Contacts extends Component {
  infos = [
    {
      name: "Mr.Whiskerson",
      src: "https://placekitten.com/300/200",
      phone: "(212) 555-1234",
      email: "mr.whiskaz@catnap.meow"
    },
    {
      name: "Fluffykins",
      src: "https://placekitten.com/400/200",
      phone: "(212) 555-2345",
      email: "fluffy@me.com",
    },
    {
      name: "Destroyer",
      src: "https://placekitten.com/400/300",
      phone: "(212) 555-3456",
      email: "ofworlds@yahoo.com"
    },
    {
      name: "Felix",
      src: "https://placekitten.com/200/100",
      phone: "(212) 555-4567",
      email: "thecat@hotmail.com"
    }
  ]
  render() {
    return (
      <div>
        <Card info={this.infos[0]}/>
        <Card info={this.infos[1]}/>
        <Card info={this.infos[2]}/>
        <Card info={this.infos[3]}/>
      </div>
    )
  }
}

export default Contacts
