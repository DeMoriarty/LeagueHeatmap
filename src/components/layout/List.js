import React from 'react'

export default function List() {
    const listStyle = {
        margin: '10px',
        listStyleType: 'none',
        padding: '0px',
    }
    const itemStyle = {
        padding: "5px",
        background: "#bbb",
        margin: "10px",
    }
    return (
        <ul style={ listStyle }>
            <li style={itemStyle}>Atlantis</li>
            <li style={itemStyle}>Greece</li>
            <li style={itemStyle}>Egypt</li>
        </ul>
    )
}