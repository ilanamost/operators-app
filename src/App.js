import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import OperatorsTable from './components/OperatorsTable/OperatorsTable';
import utilsService from './services/utilsService';

class App extends Component {
  state = {
    operators: []
  };

  componentDidMount() {
    utilsService.loadJSON('operators').then(response => {
      this.setState({
        operators: response.data
      });
    });
  }

  render() {
    return (
      <div className="App">
          <OperatorsTable operators={this.state.operators} />
      </div>
    );
  }
}

export default App;
