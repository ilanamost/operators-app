import React, { Component } from "react";
import './App.css';

import OperatorsTable from './components/OperatorsTable/OperatorsTable';
import OperatorsFilter from './components/OperatorsFilter/OperatorsFilter';
import OperatorsModal from './components/OperatorsModal/OperatorsModal';

import utilsService from './services/utilsService';
import operatorsService from './services/operatorsService';

class App extends Component {
  state = {
    operators: [],
    filteredOperators: [],
    isOperatorModal: false,
    operator: operatorsService.getEmptyOperator(),
    openRowIndex: -1
  };

  componentDidMount() {
    operatorsService.getOperators().then(response => {
        this.setState({
          operators: response,
          filteredOperators: response,
          operator: operatorsService.getEmptyOperator()
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

  toggleOperatorModal = () => {
    this.setState({
      isOperatorModal: !this.state.isOperatorModal
    });
  }

  addOperator = () => {
    let { operators } = this.state;
    const operator = this.state.operator;
    operator.id = utilsService.getNextId(operators);

    this.setState({
      operators: [...operators, operator],
      filteredOperators: [...operators, operator],
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator()
    });
  }

  handleInputChange = (e, propName, isNumber) => {
    let { operator } = this.state;
    operator[propName] = isNumber? +e.target.value : e.target.value;
    this.setState({ operator });
  }

  toggleRow = (i) => {
    let { openRowIndex } = this.state;
    (openRowIndex === i) ?  openRowIndex = -1 : openRowIndex = i;
    this.setState({ openRowIndex });
  }

  render() {
    return (
      <div className="App">
        <div className="search-container">
          <OperatorsFilter onFilter={this.operatorSearch} 
          onAddOperatorClick={this.toggleOperatorModal}/>
        </div>

        <div className="operators-container"> 
          <OperatorsTable operators={this.state.filteredOperators} 
          toggleRow={this.toggleRow}
          rowIndex={this.state.openRowIndex}/>
        </div>

        <OperatorsModal operator={this.state.operator} 
        onToggleOperatorModal={this.toggleOperatorModal}
        onAddOperator={this.addOperator}
        isOperatorModal={this.state.isOperatorModal}
        onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default App;
