import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownMenu from 'react-bootstrap/DropdownItem'
import DropdownItem from 'react-bootstrap/DropdownMenu'

export class MatchListItem extends Component {
  state = {
    icons: {},
    isOpen: false,
  }
  componentDidMount() {
    const { data } = this.props
    data.map((item, index) => {
      import(`../../data/champion_icons/${item}.jpg`)
        .then(prom => {
          this.setState(prevState => {
            prevState.icons[item] = prom.default
            return prevState
          })
        })
    })
    import(`../../data/Question.png`)
      .then( prom => {
        this.setState( prevState => {
          prevState.icons["None"] = prom.default
          return prevState
        } )
      })
    // setInterval(()=>{console.log(this.state.icons)}, 1000)
  }
  render() {
    const { data, myKey, current, name, show } = this.props
    const menuClass = `dropdown-menu${this.state.isOpen ? "-show" : ""}`
    return (
      <>
        <button
          className="btn btn-light d-inline-flex matchlist-item-dropdown"
          id={ `dropdownMenu${myKey}` }
          data-toggle="dropdown"
          aria-haspopup={ true }
          aria-expanded={ false }
          data-reference="parent"
          onClick={ e => this.setState({ isOpen: !this.state.isOpen }) }
        >
          <img
            src={ show ? this.state.icons[current] : this.state.icons["None"] }
            alt=""
            width="45"
            height="45"
            style={ { position: "relative", top: "-4.5px", left: "-11.5px" } }
          />
          <div className="text-left">
            <span className="matchlist-item-match">{ name.replace(".json", "") }</span>
            <br />
            <span className="matchlist-item-champ">{ show ? current : "None" }</span>
          </div>
        </button>
        <button
          className="btn btn-light matchlist-item-close"
          onClick={ this.props.removeMatch }
        >
          <i className="fa fa-times"></i>
        </button>
        <div
          className={ menuClass + " text-left  matchlist-item-dropdown-menu" }
          aria-labelledby={ `dropdownMenu${myKey}` }
        >
          { data.map((item, index) => (
            <button
              className="dropdown-item"
              href="#"
              key={ index }
              onClick={ e => {
                this.props.setCurrent(e, item)
                this.setState({ isOpen: false })
              } }
            >
              <img
                src={ this.state.icons[item] }
                alt=""
                width="45"
                height="45"
              />
              { item }
            </button>
          )) }
          {/* TODO: Test*/ }
          {
          <button
            className="dropdown-item"
            onClick={ e=>{
              this.props.hide(e)
              this.setState({isOpen: false})
            }}
          >
            <img 
              src = {this.state.icons["None"]}
              alt = ""
              width="45"
              height="45"
            />
            {"None"}
          </button> }
        </div>
      </>
    )
  }
}

export default MatchListItem
