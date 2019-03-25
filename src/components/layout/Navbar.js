import React from 'react'

export default function Navbar() {
  const navStyle = {
    backgroundColor : "#333",
    color: "#fff"
  }
  const listStyle = {
    listStyleType: "none",
    display: "inline-flex"
  }
  const itemStyle = {
    padding: "0em 1em",
    borderRight: "1px #aaa solid",
    borderLeft: "1px #aaa solid"
  }
  return (
    <nav style = {navStyle}>
      <ul style = {listStyle}>
        <li style = {itemStyle}>Home</li>
        <li style = {itemStyle}>About</li>
        <li style = {itemStyle}>Contact</li>
      </ul>
    </nav>
  )
}
