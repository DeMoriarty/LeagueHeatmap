import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormCheckInput from 'react-bootstrap/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/FormCheckLabel'
import FormCheck from 'react-bootstrap/FormCheck'
import FormLabel from 'react-bootstrap/FormLabel'

export class Settings extends Component {
  state = {
    open: false,
  }
  render() {
    const { open } = this.state
    return (
      <>
        <Button
          variant="primary"
          onClick={ e => { this.setState({ open: !open }) } }
          aria-controls="hm-settings"
          aria-expanded={ open }
        >
          Settings&nbsp;
          <i className={`fa ${ open ? "fa-caret-up" : "fa-caret-down"}`}></i>
        </Button>
        <Collapse in={ open }>
          <Container
            fluid
            className="border border-secondary bg-light mt-2 mr-4 rounded text-left pt-2 pb-2"
            id="hm-settings"
          >
            <div className="form-group">
              <label className="d-inline" htmlFor="size">
                Quality
                </label>
              <input
                className="custom-range"
                type="range"
                name="size"
                id=""
                min="25"
                max="100"
                onMouseUp={ this.props.setSize }
                onTouchEnd={ this.props.setSize }
              />
            </div>
            <label htmlFor="select-champ">
              Champion
            </label>
            <select
              className="custom-select"
              name="select-champ"
              id=""
              style={ { padding: '5px 10px' } }
              onChange={ this.props.handleSelect }
            >
              { this.props.champList.map((item, index) => (
                <option value={ item } key={ index }>
                  { item }
                </option>
              )) }
            </select>
            <hr/>
            <Form>
              <FormLabel>
                Heatmap Mode
              </FormLabel>
              <FormCheck>
                <FormCheckInput
                  name="mode"
                  type="radio"
                  id="hm-mode-block"
                  value="block"
                  onChange={ this.props.handleRadio }
                />
                <FormCheckLabel
                  htmlFor="hm-mode-block"
                >
                  Block
                </FormCheckLabel>
              </FormCheck>
              <FormCheck>
                <FormCheckInput
                  type="radio"
                  name="mode"
                  id="hm-mode-gaussian"
                  value="gaussian"
                  onChange={ this.props.handleRadio }
                />
                <FormCheckLabel htmlFor="">
                  Gaussian
              </FormCheckLabel>
              </FormCheck>
              <hr/>
              <FormLabel>
                Color Scheme
              </FormLabel>
              <FormCheck>
                <FormCheckInput
                  name="scheme"
                  type="radio"
                  id="hm-scheme-grayscale"
                  value="grayscale"
                  onChange={ this.props.handleRadio }
                />
                <FormCheckLabel
                  htmlFor="hm-scheme-grayscale"
                >
                  Grayscale
                </FormCheckLabel>
              </FormCheck>
              <FormCheck>
                <FormCheckInput
                  type="radio"
                  name="scheme"
                  id="hm-scheme-jet"
                  value="jet"
                  onChange={ this.props.handleRadio }
                />
                <FormCheckLabel htmlFor="hm-scheme-jet">
                  Jet
                </FormCheckLabel>
              </FormCheck>
            </Form>
          </Container>
        </Collapse>
      </>
    )
  }
}

export default Settings
