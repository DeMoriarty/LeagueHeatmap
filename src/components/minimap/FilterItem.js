import React, { Component } from 'react'

const w = 40;

export class FilterItem extends Component {
  state = {
    image: '',
    status: 'enabled',
    iconStyle: {
      position: 'relative',
      width: w,
      height: w,
      top: '0px',
      left: '0px',
      filter: 'none',
      transition: 'none',
    },
    labelStyle: {
      visibility: "hidden"
    }
  }

  componentDidMount() {
    const { champ } = this.props
    import(`../../data/champion_icons/${champ}.jpg`)
      .then(prom => {
        this.setState({
          image: prom.default,
        })
      })
  }

  handleMouseEnter = (e) => {
    this.setState({
      iconStyle: {
        ...this.state.iconStyle,
        width: w+4,
        height: w+4,
        top: '-2px',
        left: '-2px',
      },
      labelStyle: {
        ...this.state.labelStyle,
        visibility: "visible",
      }
    })
  }

  handleMouseLeave = (e) => {
    this.setState({
      iconStyle: {
        ...this.state.iconStyle,
        width: w,
        height: w,
        top: '0px',
        left: '0px',
      },
      labelStyle: {
        ...this.state.labelStyle,
        visibility: "hidden",
      }
    })
  }
  
  handleClick = (e) => {
    this.setState( {
      status: this.state.status === 'enabled' ? 'disabled':'enabled',
      iconStyle: {
        ...this.state.iconStyle,
        filter: this.state.iconStyle.filter === "none" ? 'grayscale(100%)':'none',
        transition: 'filter linear 2sec',
      }
    } )
  }

  render() {
    const { champ } = this.props
    return (
      <React.Fragment>
        <div
          className="filter-item"
          onMouseEnter={ this.handleMouseEnter }
          onMouseLeave={ this.handleMouseLeave }
          onClick={ e => {
            this.handleClick(e);
            this.props.toggle(e, champ)
          } }
        >
          <img
            src={ this.state.image }
            alt="oops"
            style={ this.state.iconStyle }
            draggable="false"
          />
          <div
            className="filter-label"
            style={this.state.labelStyle}
          >
            {this.state.status === 'enabled'? 'Hide':'Show'}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default FilterItem
