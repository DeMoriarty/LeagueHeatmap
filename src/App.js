import React, { Component } from 'react';
import './App.css';

import MinimapPlayer from './components/MinimapPlayer'
// import TodoList from './components/TodoList'
// import ContactList from './components/ContactList'
// import ConditionalComp from './components/Conditional'
// import Container from './components/ConditionalPractice'
// import FormPractice from './components/FormPractice'
// import MemeGenerator from './components/MemeGenerator'
// import MatchViewer from './components/matchViewer/Container'
import Heatmap from './components/Heatmap'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Heatmap /> */}
        <MinimapPlayer />
      </div>
    );
  }
}

export default App;