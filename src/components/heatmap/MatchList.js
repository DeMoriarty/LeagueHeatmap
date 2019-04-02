import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';

import MatchListItem from './MatchListItem'
import MatchListAdd from './MatchListAdd'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MatchList extends Component {
  render() {
    const { data } = this.props
    const items = data.map((item, index) => (
      <Row
        className="text-lg-center text-sm-left justify-content-lg-center pt-2 pb-2"
        key={ index }
      >
        <Col
          className="pl-0 pr-0"
        >
          <MatchListItem
            key={ item.id }
            data={ Object.keys(item.data) }
            show={ item.show }
            myKey={ item.id }
            name={ item.name }
            current={ item.current }
            setCurrent={ (e, value) => this.props.setCurrent(e, item.id, value) }
            removeMatch={ e => this.props.removeMatch(e, item.id) }
            hide={ (e) => this.props.hide(e, item.id) }
          />
        </Col>
      </Row>
    ))
    return (
      <Container
        className="d-block"
        fluid
        style={ { width: "300px" } }
      >
        { items }
        <Row className="text-center justify-content-lg-center pt-2 pb-2">
          <Col className="text-sm-left text-lg-center pl-0 pr-0">
            <MatchListAdd
              addMatch={ this.props.addMatch }
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MatchList
