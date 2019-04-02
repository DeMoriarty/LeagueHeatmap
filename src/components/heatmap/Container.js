import React, { Component } from 'react'
import './style.css'
import Data from '../../data/minimap3.json'

import Displayer from './Displayer'
import Controller from './Controller'
import MatchList from './MatchList'
import TimeRangeButton from './TimeRangeButton'
import { default as BSContainer } from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { f2t, t2f } from './util'

export class Container extends Component {
  max = Math.max(...Object.values(Data).map(value => {
    let keys = Object.keys(value)
    let max = keys[keys.length - 1]
    if (max === undefined) max = '0'
    return Number(max)
  }))
  state = {
    maxFrame: this.max,
    size: [50, 50],
    from: 0,
    files: [Data],
    champList: Object.keys(Data),
    current: Object.keys(Data)[0],
    data: [{
      data: Data,
      current: Object.keys(Data)[0],
      id: 0,
      name: "first_match",
      show: true,
    }],
    to: this.max,
    mode: "gaussian",
    scheme: "jet",
    buttons: [[0, this.max, 0]],
    candidateRange: `${f2t(0)}-${f2t(this.max)}`,
  }
  componentDidMount() {
  }
  setCurrent = (e, key, value) => {
    this.setState(prevState => {
      for (let i = 0; i < prevState.data.length; i++) {
        let item = prevState.data[i]
        if (item.id === key) {
          item.current = value
          item.show = true
          break
        }
      }
      return prevState
    })
  }

  hide = (e, key) => {
    this.setState(prevState => {
      for (let i = 0; i < prevState.data.length; i++) {
        let item = prevState.data[i]
        if (item.id === key) {
          item.show = false
          break
        }
      }
      return prevState
    })
  }

  addMatch = (e) => {
    const { files } = e.target
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const { name } = file
      if (!name.endsWith(".json")) {
        alert("Please add JSON file")
        break
      }
      let freader = new FileReader()
      freader.readAsText(file)
      freader.onload = e => {
        let content = JSON.parse(e.target.result)
        let keys = Object.keys(content)
        for (let key of keys) {
          let newKey = key.split(" ")
            .map(item => item.split("'")
              .map(item2 => {
                return [item2[0].toUpperCase(), item2.slice(1)].join('')
              }).join("'")
            ).join(" ")
            .replace("Jarvan Iv", "Jarvan IV")
          if (key !== newKey) {
            content[newKey] = content[key]
            content[key] = undefined
            delete content[key]
          }
        }
        let newData = {
          data: content,
          current: Object.keys(content)[0],
          name,
          id: this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].id + 1 : 0,
          show: true,
        }
        let maxFrame = Math.max(...Object.values(content).map(value => {
          let keys = Object.keys(value)
          let max = keys[keys.length - 1]
          if (max === undefined) max = '0'
          return Number(max)
        }))
        this.setState({
          data: [...this.state.data, newData],
          maxFrame: Math.max(maxFrame, this.state.maxFrame)
        })
      }
    }
  }

  removeMatch = (e, id) => {
    let newData = this.state.data.filter((item, index) => item.id !== id)
    let maxFrame = 1
    for (let item of newData) {
      let itemMax = Math.max(...Object.values(item.data).map(value => {
        let keys = Object.keys(value)
        let max = keys[keys.length - 1]
        if (max === undefined) max = '0'
        return Number(max)
      }))
      maxFrame = itemMax > maxFrame ? itemMax : maxFrame
    }
    this.setState({
      data: newData,
      maxFrame,
    })
  }

  setFrom = (e) => {
    let { value } = e.target
    this.setState({
      from: value,
    })
  }

  setTo = (e) => {
    this.setState({
      to: e.target.value,
    })
  }
  setRange = (range) => {
    this.setState({
      from: range[0],
      to: range[1],
      candidateRange: `${f2t(range[0])}-${f2t(range[1])}`
    })
  }
  setSize = (e) => {
    let { name, value } = e.target
    value = Number(value)
    if (name === "size") {
      this.setState({
        size: [value, value]
      })
    }
  }
  handleSelect = (e) => {
    this.setState({ current: e.target.value })
  }
  handleRadio = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }
  addButton = (e) => {
    const { buttons } = this.state
    let content = this.state.candidateRange
    if (!RegExp('(\\d{1,2}:)?\\d{1,2}:\\d{1,2}-(\\d{1,2}:)?\\d{1,2}:\\d{1,2}').test(content)) {
      alert('Input is not valid!')
      return
    }
    let range = content.split('-')
    range = range.map(item => t2f(item))
    for (let button of buttons) {
      if (f2t(button[0]) === f2t(range[0]) && f2t(button[1]) === f2t(range[1])) {
        return
      }
    }
    content = `${f2t(range[0])}-${f2t(range[1])}`
    let key = buttons.length > 0 ? buttons[buttons.length - 1][2] + 1 : 0
    let newbtn = [range[0], range[1], key]
    this.setState({ buttons: [...this.state.buttons, newbtn] })
  }
  everyXMin = (e, x) => {
    const { maxFrame, buttons } = this.state
    let initialLen = buttons.length > 0 ? buttons[buttons.length - 1][2] : -1
    let newButtons = []
    for (let from = 0; from < maxFrame; from += x * 30 * 60) {
      let to = from + x * 30 * 60 - 1
      if (to > maxFrame) to = maxFrame
      let content = `${f2t(from)}-${f2t(to)}`
      let repeated = false
      for (let button of buttons) {
        if (`${f2t(button[0])}-${f2t(button[1])}` === content) {
          repeated = true
        }
      }
      if (repeated) continue
      let newbtn = [from, to, ++initialLen]
      newButtons.push(newbtn)
    }
    this.setState({ buttons: [...buttons, ...newButtons] })
  }
  removeButton = (e, key) => {
    const { buttons } = this.state
    this.setState({ buttons: buttons.filter(value => value[2] !== key) })
  }

  clearButtons = e => {
    this.setState({ buttons: [] })
  }
  changeTimeRange = e => {
    const { value } = e.target
    this.setState({ candidateRange: value })
  }
  render() {
    const { size, maxFrame, from, to, current, mode, scheme } = this.state
    const buttons = this.state.buttons.map(([from, to, key]) => (
      <TimeRangeButton
        from={ from }
        to={ to }
        setRange={ this.setRange }
        removeButton={ this.removeButton }
        key={ key }
        itemKey={ key }
      />
    ))
    return (
      <>
        <BSContainer fluid className="mh-100 bg-secondary">
          <Row className="justify-content-center">
            <Col
              className="bg-secondary pt-4 pb-4"
              xs={ 12 }
              sm={ 4 }
              md={ 3 }
              style={ { overflowY: "none", overflowX: "hidden" } }
            >
              <MatchList
                data={ this.state.data }
                setCurrent={ this.setCurrent }
                removeMatch={ this.removeMatch }
                addMatch={ this.addMatch }
                hide={ this.hide }
              />
            </Col>
            <Col
              className="bg-dark pb-2 pt-2"
              xs={ 12 }
              sm={ 8 }
              md={ 6 }
            >
              <Displayer
                data={ this.state.data }
                size={ `${size[0]}x${size[1]}` }
                mode={ mode }
                scheme={ scheme }
                from={ from }
                to={ to }
              />
              <Controller
                maxFrame={ maxFrame }
                from={ from }
                to={ to }
                setSize={ this.setSize }
                setRange={ this.setRange }
                champList={ this.state.champList }
                handleSelect={ this.handleSelect }
                handleRadio={ this.handleRadio }
                buttons={ buttons }
                addButton={ this.addButton }
                everyXMin={ this.everyXMin }
                clearButtons={ this.clearButtons }
                changeTimeRange={ this.changeTimeRange }
                candidateRange={ this.state.candidateRange }
              />
            </Col>
            <Col className="bg-secondary">
            </Col>
          </Row>
        </BSContainer>
      </>
    )
  }
}

export default Container
