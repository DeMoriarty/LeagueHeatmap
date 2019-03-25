import React, { Component } from 'react'
import List from './List'

export class AboutMe extends Component {
    static divStyle = {
        backgroundColor: '#eee',
        margin: '10px',
        paddingBottom: '5px',
    }
    static titleStyle = {
        backgroundColor: '#999',
        padding: "5px",
        color: '#111',
    }
    render() {
        return (
            <div style={AboutMe.divStyle}>
                <h1 style={AboutMe.titleStyle}>Sehban Omer</h1>
                <p>This is AboutMe. I'm learning React</p>
                <List />
            </div>
        )
    }
}

export default AboutMe
