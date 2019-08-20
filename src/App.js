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
    openRowIndex: -1,
    isInEditMode: false
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

  toggleOperatorModal = (id) => {
    let { operators, operator } = this.state;
    let operatorToEdit;
    if(id) {
    operatorToEdit = operators.find((operator) => {
      return operator.id === id
    });
    }
    this.setState({
      isOperatorModal: !this.state.isOperatorModal,
      operator: (id) ? operatorToEdit : operator,
      isInEditMode: (id) ? true : false
    });
  }

  addOperator = () => {
    let { operators, operator } = this.state;
    operator.id = utilsService.getNextId(operators);

    this.setState({
      operators: [...operators, operator],
      filteredOperators: [...operators, operator],
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator()
    });
  }

  updateOperator = () => {
    let { operators, operator } = this.state;
    const operatorIdx = operators.findIndex(currOperator => currOperator.id === operator.id);
    operators.splice(operatorIdx, 1, operator);

    this.setState({
      operators: [...operators],
      filteredOperators: [...operators],
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
          rowIndex={this.state.openRowIndex}
          onToggleOperatorModal={this.toggleOperatorModal}/>
        </div>

        <OperatorsModal operator={this.state.operator} 
        onToggleOperatorModal={this.toggleOperatorModal}
        onAddOperator={((this.state.isInEditMode) ? this.updateOperator : this.addOperator)}
        isOperatorModal={this.state.isOperatorModal}
        onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default App;
