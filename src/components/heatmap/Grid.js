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
      // console.log(grid[x][y])
      grid[x][y]++
    }

    return grid
  }

  sumGrid = grids => {
    if (grids.length > 0) {
      let grid = grids[0].map((row, i) => {
        return row.map((item, j) => {
          let sum = 0
          for (let grid of grids) {
            sum += grid[i][j]
          }
          return sum
        })
      })
      let mean = this.getMean(grid) * 5
      grid = grid.map(value => value.map(item => item / mean))
      grid = grid.map(value => value.map(item => item < 1 ? item : 1))
      return grid
    }
  }

  gen = (width, height, grid, mode = "block", scheme = "jet", scale = 20) => {
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
          patchSize = patchSize.map(item => item > 1 ? item : 1)
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
    for (let i = 0; i < size[0]; i++) {
      for (let j = 0; j < size[1]; j++) {
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

  sliceData = (data, from, to) => {
    from = Number(from)
    to = Number(to)
    let keys = Object.keys(data)
    let result = JSON.parse(JSON.stringify(data))
    for (let key of keys) {
      if (key < from) {
        delete result[key]
      } else if (key > to) {
        delete result[key]
      }
    }
    return result
  }

  componentDidMount() {
    const { width, height, size, mode, scheme, from, to } = this.props
    let { data } = this.props
    let [col, row] = size.split('x')
    col = Number(col)
    row = Number(row)
    data = data.map(item => item.data[item.current])
    // TODO: Temporary

    data = data[0]
    data = this.sliceData(data, from, to)
    const grid = this.count(col, row, data)
    this.setState({
      items: this.gen(width, height, grid, mode, scheme),
    })
  }
  componentWillReceiveProps(nextProps) {
    const { width, height, size, mode, scheme, from, to } = nextProps
    let { data, champs } = nextProps
    if (size !== this.props.size
      || data !== this.props.data
      || from !== this.props.from
      || to !== this.props.to
      || mode !== this.props.mode
      || scheme !== this.props.scheme
      || champs !== this.props.champs
      || true) {
      let [col, row] = size.split('x')
      data = data.map(item => item.show ? item.data[item.current] : [])
      if (data.length < 1) {
        this.setState({ items: [] })
        return
      }

      let grids = []
      for (let item of data) {
        item = this.sliceData(item, from, to)
        const tGrid = this.count(col, row, item)
        grids.push(tGrid)
      }
      const grid = this.sumGrid(grids)
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
