import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'


window.addEventListener('click', (e) => {
  // console.log(e.clientX, e.clientY);
  let x = e.clientX
  let y = e.clientY
  let root = document.getElementById('root')
  // const container = document.createElement('div')
  const container = document.createElement('div')

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      let ripples = document.createElement('sup')
      ripples.style.left = `${x}px`
      ripples.style.top = `${y}px`
      container.appendChild(ripples)

      setTimeout(() => {
        ripples.remove()
      }, 2000);
    }, 400 * i);
  }

  root.appendChild(container)
})

ReactDOM.render(<App />, document.getElementById('root'))
