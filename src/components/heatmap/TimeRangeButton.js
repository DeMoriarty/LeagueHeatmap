import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { f2t } from './util'

export default class TimeRangeButton extends Component {
  render() {
    const { from, to, itemKey, setRange } = this.props
    return (
      <ButtonGroup
        className="mr-2 mb-2"
      >
        <Button
          variant="secondary"
          onClick={ e => {
            setRange([from, to])
          } }
        >
          <i className="far fa-clock"></i>&nbsp;
        { `${f2t(from)}-${f2t(to)}` }
        </Button>
        <Button
          variant="danger"
          onClick={ e=>this.props.removeButton(e, itemKey) }
        >
          <i className="fa fa-times" />
        </Button>
      </ButtonGroup>
    )
  }
}
