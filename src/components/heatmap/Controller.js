import React, { Component } from 'react'
import RangeSlider from './RangeSlider'
import Settings from './Settings'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class Controller extends Component {
  state = {
    champList: [],
  }
  componentDidMount() {
    this.setState({ champList: this.props.champList })
  }
  render() {
    return (
      <Container fluid>
            <RangeSlider
              onChange={ this.props.setRange }
              max={ this.props.maxFrame }
              from={ this.props.from }
              to={ this.props.to }
              frameRate={ this.props.frameRate }
            />
            <ButtonToolbar className="ml-2 mb-3" aria-label="but-toolbar">
              <ButtonGroup className="mb-2" aria-label="but-group2">
                <Button
                  style={ { borderTopRightRadius: 0, borderBottomRightRadius: 0, } }
                  variant="primary"
                  onClick={ this.props.addButton }
                ><i className="fa fa-plus"></i></Button>
              </ButtonGroup>
              <form className="form-inline">
                <input
                  className="form-control border border-primary mb-2"
                  style={ { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }
                  type="text"
                  name="time-range"
                  id=""
                  value={ this.props.candidateRange }
                  onChange={ this.props.changeTimeRange }
                />
              </form>
              <ButtonGroup className="ml-lg-2 mb-2">
                <Button
                  variant="primary"
                  onClick={ (e) => this.props.everyXMin(e, 5) }
                >
                  Every 5 minutes
            </Button>
              </ButtonGroup>
              <ButtonGroup className="ml-2 mr-2 mb-2">
                <Button
                  variant="danger"
                  onClick={ this.props.clearButtons }
                >
                  Clear All
            </Button>
              </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar
              className="m-2 p-2 border border-secondary rounded"
            >
              { this.props.buttons }
            </ButtonToolbar>
            <ButtonToolbar className="ml-2">
              <Settings
                setSize={ this.props.setSize }
                handleRadio={ this.props.handleRadio }
                handleSelect={ this.props.handleSelect }
                champList={ this.state.champList }
              />
            </ButtonToolbar>
      </Container>
    )
  }
}

export default Controller
