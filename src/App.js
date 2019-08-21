import React, { Component } from "react";
import "./App.css";

import OperatorsTable from "./components/OperatorsTable/OperatorsTable";
import OperatorsFilter from "./components/OperatorsFilter/OperatorsFilter";
import OperatorsModal from "./components/OperatorsModal/OperatorsModal";

import utilsService from "./services/utilsService";
import operatorsService from "./services/operatorsService";

const FILE_NAME = "operators";

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
    utilsService.loadJSON(FILE_NAME).then((res) => {
      this.setState({
        operators: res.data,
        filteredOperators: res.data,
        operator: operatorsService.getEmptyOperator()
      });
    });
  }

  operatorSearch = term => {
    const operators = operatorsService.getOperators(this.state.operators, term);
    this.setState({
          filteredOperators: operators
      });
  };

  toggleOperatorModal = id => {
    let { operators, operator } = this.state;
    let operatorToEdit;
    if (id) {
      operatorToEdit = operators.find(operator => {
        return operator.id === id;
      });
    }
    this.setState({
      isOperatorModal: !this.state.isOperatorModal,
      operator: id ? operatorToEdit : operatorsService.getEmptyOperator(),
      isInEditMode: id ? true : false
    });
  };

  addOperator = () => {
    let { operators, operator } = this.state;
    operator.id = utilsService.getNextId(operators);

    this.setState({
      operators: [...operators, operator],
      filteredOperators: [...operators, operator],
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator()
    });
  };

  updateOperator = () => {
    let { operators, operator } = this.state;
    const operatorIdx = operators.findIndex(
      currOperator => currOperator.id === operator.id
    );
    operators.splice(operatorIdx, 1, operator);

    this.setState({
      operators: [...operators],
      filteredOperators: [...operators],
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator()
    });
  };

  handleInputChange = (e, propName, isNumber) => {
    let { operator } = this.state;
    operator[propName] = isNumber ? +e.target.value : e.target.value;
    this.setState({ operator });
  };

  toggleRow = i => {
    let { openRowIndex } = this.state;
    openRowIndex === i ? (openRowIndex = -1) : (openRowIndex = i);
    this.setState({ openRowIndex });
  };

  render() {
    return (
      <div className="App">
        <div className="search-container">
          <OperatorsFilter
            onFilter={this.operatorSearch}
            onAddOperatorClick={this.toggleOperatorModal}
          />
        </div>

        <div className="operators-container">
          <OperatorsTable
            operators={this.state.filteredOperators}
            toggleRow={this.toggleRow}
            rowIndex={this.state.openRowIndex}
            onToggleOperatorModal={this.toggleOperatorModal}
          />
        </div>

        <OperatorsModal
          operator={this.state.operator}
          onToggleOperatorModal={this.toggleOperatorModal}
          onAddOperator={
            this.state.isInEditMode ? this.updateOperator : this.addOperator
          }
          isOperatorModal={this.state.isOperatorModal}
          onInputChange={this.handleInputChange}
          title={this.state.isInEditMode ? 'עדכון מפעיל' : 'הוספת מפעיל'}
        />
        {/* <div><i className="fa fa-spinner fa-spin">no spinner but why</i></div>; */}
      </div>
    );
  }
}

export default App;
