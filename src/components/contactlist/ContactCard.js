import React, { Component } from 'react'

export class ContactCard extends Component {
  render() {
    return (
      <div className="contact-card">
        <img src={this.props.info.src} alt=""/>
        <h3>{this.props.info.name}</h3>
        <p>Phone:{this.props.info.phone}</p>
        <p>Email:{this.props.info.email}</p>
      </div>
    )
  }
}

export default ContactCard
