import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Viewer} from './components/Viewer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Rico was here
        </header>
        <Viewer/>
      </div>
    );
  }
}

export default App;
