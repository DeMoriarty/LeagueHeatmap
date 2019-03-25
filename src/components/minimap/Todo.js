import React, { Component } from 'react'

export class Todo extends Component {
  render() {
    return (
      <div className="todos">
        <h2>Todos:</h2>
        <p className="">Path gradient acting weird.</p>
        <p className="">(low prio)Remove black border from minimap image</p>
        <p className="">(low prio)Add towers, inhibs, jungle camps, to minimap.</p>
        <p className="">Controller: show current_time/total_time(on controller and minimap)</p>
        <p className="">Controller: fast forward, fast backward, speed, etc.</p>
        <p className="">Heatmap! user can specify grid size, user can specify time range</p>
        <p className="">Make an svg for minimap that only contains edges (or use edge detection algo)</p>
        <p className="">Don't bite. it's kinda making it inaccuracte. idktbh</p>
        <p className="">Cut the tail after big leaps (Recall, Teleport etc), or maybe not?</p>
        <p className="">Champion icons blocking hover tag</p>
        <p className="">more...</p>
        <p className="checked">Controller: keyboard shortcuts, for example: Pause/Play on Space, fforward on right arrow, fbackword on left arrow <br/> Solution: solved</p>
        <p className="checked">Different path style (width, color, etc.)<br/>Solution: random color for each item</p>
        <p className="checked">Champion filter show name on hover(or show "enable/disable") <br/>Solution: Show/Hide</p>
        <p className="checked">Too damn slow.<br/> Solution: improved performance a little bit</p>
        <p className="checked">Too many duplicate points. try to simplify path data.<br/>Solution: remove duplicate points on fly. maybe remove them in data generation process?</p>
        <p className="checked">Kai'Sa img not displaying properly for some reason. <br/>Solution: remove single quote</p>
        <p className="checked">Different color for hover label. maybe dark grey background with white text?<br/>Solution: dark grey back with white text</p>
        <p className="checked">Hover label arrow misplacement.<br/>Solution: fixed</p>
        <p className="checked">Size change on hovering champion icons while playing(isn't working for some reason)<br/>Solution: Component will recieve props </p>
      </div>
    )
  }
}

export default Todo
