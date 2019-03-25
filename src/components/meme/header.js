import React from 'react'
import './style.css'

export default function header() {
  return (
    <header className="header">
      <img
        src="http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png"
        alt="Problem"
        className="header-img"
      />
      <p className="header-text">
        Meme Generator
      </p>
    </header>
  )
}
