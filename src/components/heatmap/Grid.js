import React, { Component } from 'react'
import GridCell from './GridCell'

export class Grid extends Component {
  state = {
    items: [],
    maxValue: 0,
  }

  softmax = arr => {
    const C = Math.max(...arr)
    const d = arr.map(y => Math.exp(y - C)).reduce((a, b) => a + b)
    return arr.map(value => Math.exp(value - C) / d)
  }

  gaussian = (x, cx, sigma = 0.17) => {
    return Math.pow(Math.E, (-0.5 * Math.pow((x - cx) / sigma, 2)))
  }

  gaussian2d = (x, y, cx, cy, sigmax, sigmay = sigmax) => {
    return this.gaussian(x, cx, sigmax) * this.gaussian(y, cy, sigmay)
  }

  getMax = (grid) => {
    let maxes = []
    for (let column of grid) {
      maxes.push(Math.max(...column))
    }
    return Math.max(...maxes)
  }

  getMean = grid => {
    let sum = 0
    let counter = 0
    for (let column of grid) {
      for (let item of column) {
        sum += item
        counter++
      }
    }
    return sum / counter
  }
  getSum = arr => {
    return arr.reduce((t, c) => t + c)
  }


  count = (col, row, data) => {
    let grid = []
    const vals = Object.values(data)
    for (let i = 0; i < col; i++) {
      let column = []
      for (let j = 0; j < row; j++) {
        column.push(0)
      }
      grid.push(column)
    }
    let cellWidth = 1 / col
    let cellHeight = 1 / row
    for (let item of vals) {
      let x = Math.floor(item[0] / cellWidth)
      let y = Math.floor(item[1] / cellHeight)
      grid[x][y]++
    }
    let max = this.getMax(grid)
    let mean = this.getMean(grid) * 5
    grid = grid.map(value => value.map(item => item / mean))
    grid = grid.map(value => value.map(item => item < 1 ? item : 1))
    return grid
  }

  /// TEMP
  gaussianGrid = grid => {
    return grid.map((col, i) => col.map((item, j) => {
      return this.setValue(i, j, item, grid, "gaussian")
    }))

  }
  generate = (width, height, grid) => {
    let res = []
    let col = grid.length
    let row = grid[0].length
    let cellWidth = width / col
    let cellHeight = height / row

    grid = this.gaussianGrid(grid)
    let max = this.getMax(grid)
    grid = grid.map(value => value.map(item => item / max))

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        const item = <GridCell
          width={ cellWidth }
          height={ cellHeight }
          x={ i }
          y={ j }
          value={ grid[i][j] }
          grid={ grid }
          key={ `${i},${j}` }
        />
        res.push(item)
      }
    }
    return res
  }

  setValue = (x, y, value, grid, mode = "gaussian") => {
    let size = [grid.length, grid[0].length]
    if (mode === "block") {
      value = value
    } else if (mode === "gaussian") {
      let ss = grid.map((col, i) => col.map((item, j) => {
        return this.gaussian2d(x / size[0], y / size[1], i / size[0], j / size[1], 0.025) * grid[i][j]
      }))
      value = this.getSum(ss.map(arr => this.getSum(arr)))
    }
    return value
  }

  gen = (width, height, grid, mode = "block", scheme="jet", scale=20) => {
    let size = [grid.length, grid[0].length]
    let cellWidth = width / size[0]
    let cellHeight = height / size[1]
    let res = []
    grid = grid.map((col, i) => {
      return col.map((value, j) => {
        if (mode === "block") {
          value = grid[i][j]
        } else if (mode === "gaussian") {
          let patchSize = [size[0] / scale, size[1] / scale]
          patchSize = patchSize.map(item=>item > 1 ? item : 1)
          let top_left = [Math.round(i - patchSize[0]), Math.round(j - patchSize[1])]
          let bottom_right = [Math.round(i + patchSize[0]), Math.round(j + patchSize[1])]
          top_left = top_left.map(i => {
            i = i > 0 ? i : 0
            return i < size[0] ? i : size[0]
          })
          bottom_right = bottom_right.map(i => {
            i = i > 0 ? i : 0
            return i < size[1] ? i : size[1]
          })
          let patch = grid.slice(top_left[0], bottom_right[0]).map((column, x) => {
            x = top_left[0] + x
            return this.getSum(column.slice(top_left[1], bottom_right[1]).map((item, y) => {
              y = top_left[1] + y
              return this.gaussian2d(x / size[0], y / size[1], i / size[0], j / size[1], 0.025) * item
            }))
          })
          value = this.getSum(patch)
        }
        return value
      })
    })
    let max = this.getMax(grid)
    grid = grid.map(value => value.map(item => item / max))
    for (let i = 0; i < size[0]; i++){
      for (let j = 0; j < size[1]; j++){
        res.push(<GridCell
          width={ cellWidth }
          height={ cellHeight }
          x={ i }
          y={ j }
          value={ grid[i][j] }
          scheme={ scheme }
          key={ `${i},${j}` }
        />)
      }
    }
    return res
  }

  componentDidMount() {
    const { width, height, size, data, mode, scheme } = this.props
    let [col, row] = size.split('x')
    col = Number(col)
    row = Number(row)
    const grid = this.count(col, row, data)
    this.setState({
      items: this.gen(width, height, grid, mode, scheme),
    })
  }
  componentWillReceiveProps(nextProps) {
    const { width, height, size, data, mode, scheme } = nextProps
    if (size !== this.props.size) {
      let [col, row] = size.split('x')
      col = Number(col)
      row = Number(row)
      const grid = this.count(col, row, data)
      this.setState({
        items: this.gen(width, height, grid, mode, scheme),
      })
    }
  }
  render() {
    return (
      <g>
        { this.state.items }
      </g>
    )
  }
}

export default Grid
