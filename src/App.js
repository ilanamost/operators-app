import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import OperatorsTable from './components/OperatorsTable/OperatorsTable';
import OperatorsFilter from './components/OperatorsFilter/OperatorsFilter';
import utilsService from './services/utilsService';
import operatorsService from './services/operatorsService';

class App extends Component {
  state = {
    operators: [],
    filteredOperators: []
  };

  componentDidMount() {
    operatorsService.getOperators().then(response => {
        this.setState({
          operators: response,
          filteredOperators: response
        });
      });
  }

  operatorSearch = term => {
    const operators = operatorsService.getOperators(term).then((res) => {
         this.setState({
          filteredOperators: res
        });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="search-container">
          <OperatorsFilter onFilter={this.operatorSearch} />
        </div>
         <div className="operators-container"> 
            <OperatorsTable operators={this.state.filteredOperators} />
         </div>
      </div>
    );
  }
}

export default App;
