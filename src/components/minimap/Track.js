import React, { Component } from 'react'
import NameTag from './NameTag'

export class Track extends Component {
  x = -100;
  y = -100;

  state = {
    r: 0,
    x: -100,
    y: -100,
    color: '',
    data: null,
    labelStyle: {
      visibility: "hidden"
    },
    borderStyle: {
      r: 2,
      fill: "rgb(173, 216, 230)"
    },
    pathStyle: {
      d: '',
      width: 3,
    }
  }


  onMouseEnter = e => {
    this.setState({
      labelStyle: {
        visibility: "visible"
      },
      borderStyle: {
        r: this.state.r + 3,
        fill: "rgb(193, 236, 255)"
      },
      pathStyle: {
       ...this.state.pathStyle,
        width: 5,
      }
    })
  }

  onMouseLeave = e => {
    this.setState({
      labelStyle: {
        visibility: "hidden"
      },
      borderStyle: {
        r: this.state.r + 2,
        fill: "rgb(173, 216, 230)"
      },
      pathStyle: {
        ...this.state.pathStyle,
        width: 3,
      }
    })
  }

  componentWillMount() {
    let { name, width, data } = this.props
    import(`../../data/champion_icons/${name}.jpg`)
      .then(prom => {
        this.icon = prom.default
      })
    let r = width / 25
    let color = `hsl(${Math.round(Math.random()*360)}, 100%, 50%)`
    this.setState({
      r,
      data,
      color,
      borderStyle: {
        r: r + 2,
        fill: "rgb(193, 236, 255)"
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { frame, width, height } = nextProps
    const data = this.state.data
    const keys = Object.keys(data)
    const len = keys.length
    const r = width / 25
    const currentPos = data[frame]
    let x = -100, y = -100
    if (currentPos !== undefined) {
      x = currentPos[0] * width
      y = currentPos[1] * height
    }

    if (len === 0) {
      x = -200;
      y = -200;
    }
    
    let counter = 0
    for (let key of keys) {
      if (key >= frame) {
        break
      }
      counter += 1
    }
    let path = Object.values(data)
    let start = 0
    if (counter >= 300){
      start = counter - 300
    }
    path = this.createPath(path.slice(start, counter), width, height)
    this.setState({
      r: r,
      x: x !== -100 ? x : this.state.x,
      y: y !== -100 ? y : this.state.y,
      pathStyle: {
        ...this.state.pathStyle,
        d: path,
      }
    })
  }

  createPath = (arr, width, height) => {
    if (arr.length > 0) {
      let firstPt = arr.shift()
      let path = arr.map((value, index, array) => {
        if (index === 0){
          return 'L' + Math.round(value[0] * width) + ' ' + Math.round(value[1] * height)
        } else if (value[0] !== array[index - 1][0]
          || value[1] !== array[index - 1][1]){
          return 'L' + Math.round(value[0] * width) + ' ' + Math.round(value[1] * height)
        } else {
          return ''
        }
      })
      path = `M${ Math.round(firstPt[0] * width) } ${ Math.round(firstPt[1] * height) } ${path.join(' ')}`
      return path
    } else {
      return ''
    }

  }

  render() {
    let { name, enabled } = this.props
    name = name.replace(' ', '_').replace("'","")
    // if (name==="Kai'Sa") console.log(this.icon) 
    return enabled && (
      <g>
        <defs>
          <pattern
            id={ name }
            patternUnits="userSpaceOnUse"
            width={ this.state.r * 2 }
            height={ this.state.r * 2 }
            x={ this.state.x - this.state.r }
            y={ this.state.y - this.state.r }
          >
            <image
              xlinkHref={ this.icon }
              x={ 0 }
              y={ 0 }
              width={ this.state.r * 2 }
              height={ this.state.r * 2 }
            ></image>
          </pattern>
          <linearGradient id={`grad_${name}`}>
            <stop offset="0%" stopColor={this.state.color}/>
            <stop offset="50%" stopColor={this.state.color}/>
            <stop offset="100%" stopColor={this.state.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
         stroke={`url(#grad_${name})`}
          fillOpacity="0"
          strokeLinejoin="round"
          strokeWidth={ this.state.pathStyle.width }
          d={ this.state.pathStyle.d }
        ></path>
        <circle
          cx={ this.state.x }
          cy={ this.state.y }
          style={ this.state.borderStyle }
        ></circle>
        <circle
          cx={ this.state.x }
          cy={ this.state.y }
          r={ this.state.r }
          fill={ `url(#${name})` }
        > </circle>
        <NameTag
          x={ this.state.x }
          y={ this.state.y - 5 }
          r={ this.state.r }
          name = { name }
          visibility={ this.state.labelStyle.visibility }
        />
        <circle
          cx={ this.state.x }
          cy={ this.state.y }
          r={ this.state.r }
          fill='rgba(0, 0, 0, 0)'
          onMouseEnter={ e => {
            this.onMouseEnter(e)
            // this.props.focusItem(e, id)
          } }
          onMouseLeave={ this.onMouseLeave }
        > </circle>
      </g>
    )
  }
}

export default Track
