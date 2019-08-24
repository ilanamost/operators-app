import React, { Component } from "react";
import "./App.css";

import OperatorsTable from "./components/OperatorsTable/OperatorsTable";
import OperatorsFilter from "./components/OperatorsFilter/OperatorsFilter";
import OperatorsModal from "./components/OperatorsModal/OperatorsModal";
import Pagination from "./components/Pagination/Pagination";

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
    isInEditMode: false,
    dropdownOpen: false,
    pagination: {
      currPage: 1, 
      rowsNumber: 5,
      numberOfPages: 0
    }
  };

  componentDidMount() {
    utilsService.loadJSON(FILE_NAME).then(res => {
      this.setState({
        operators: res.data,
        operator: operatorsService.getEmptyOperator()
      });

      const { operators, pagination } = this.state;
      const numberOfPages =  this.getNumOfPages(operators.length , pagination.rowsNumber);
      const rowsNumber = 5;
      const filteredOperators = 
      this.getOperatorsPerPage(
        operators, 
        (pagination.currPage - 1)*rowsNumber, 
        rowsNumber*pagination.currPage);
  
      this.setState({
        pagination: {
          currPage: 1, 
          rowsNumber: rowsNumber, 
          numberOfPages: numberOfPages
        },
        filteredOperators: filteredOperators.reverse() 
      });
    });
  }

  getOperatorsPerPage = (operators, startIndex, rowsNumber) => {
    return operators.slice(startIndex, rowsNumber);
  }
 
  operatorSearch = term => {
    const { pagination } = this.state;
    const operators = operatorsService.getOperators(this.state.operators, term);
    const filteredOperators = 
    this.getOperatorsPerPage(
      operators, 
      (pagination.currPage - 1)*pagination.rowsNumber, 
      pagination.rowsNumber*pagination.currPage);
    this.setState({
      filteredOperators: filteredOperators.reverse() 
    });
  };

  toggleOperatorModal = id => {
    let { operators } = this.state;
    let operatorToEdit;
    if (id) {
      operatorToEdit = operatorsService.getOperatorById(operators, id);
    }
    this.setState({
      isOperatorModal: !this.state.isOperatorModal,
      operator: id ? operatorToEdit : operatorsService.getEmptyOperator(),
      isInEditMode: id ? true : false
    });
  };

  addOperator = () => {
    let { operators, operator, pagination } = this.state;
    const newOperators = operatorsService.addOperator(operators, operator);

    const filteredOperators = this.getOperatorsPerPage(
      newOperators, 
      (pagination.currPage - 1)*pagination.rowsNumber, 
      pagination.rowsNumber*pagination.currPage);

    const numberOfPages =  this.getNumOfPages(newOperators.length , pagination.rowsNumber);

    this.setState({
      operators: newOperators,
      filteredOperators: filteredOperators.reverse(),
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator(),
      pagination: {
        numberOfPages: numberOfPages,
        currPage: pagination.currPage, 
        rowsNumber: pagination.rowsNumber
      }
    });
  };

  updateOperator = () => {
    let { operators, operator, pagination } = this.state;
    const newOperators = operatorsService.updateOperator(operators, operator);

    const filteredOperators = this.getOperatorsPerPage(
      newOperators, 
      (pagination.currPage - 1)*pagination.rowsNumber, 
      pagination.rowsNumber*pagination.currPage);

    this.setState({
      operators: newOperators,
      filteredOperators: filteredOperators.reverse(),
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator(),
      openRowIndex: -1
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

  toggleDropdown = () => {
    let { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  };

  selectValue = (rowsNumber) => {
    const { operators } = this.state;
    const numberOfPages =  this.getNumOfPages(operators.length, rowsNumber);
    const currPage = 1;
    const filteredOperators = 
    this.getOperatorsPerPage(
      operators, 
      (currPage - 1)*rowsNumber, 
      rowsNumber*currPage);

    this.setState({
      pagination: {
        currPage: currPage, 
        rowsNumber: rowsNumber, 
        numberOfPages: numberOfPages
      },
      filteredOperators: filteredOperators.reverse()
    });
  }

  getCurrPage = (direction, currPage, numberOfPages) => {
    switch(direction) {
      case 'next':
        if(currPage < numberOfPages) {
          return ++currPage;
        }
        return currPage;

      case 'pervious':
        if(currPage > 1) {
          return --currPage;
        }
        return currPage;
        
      default:
        return currPage;
    }
  }

  changeCurrPage = (direction) => {
    const { operators, pagination } = this.state;
    let currPage = pagination.currPage;
    currPage = this.getCurrPage(direction, currPage, pagination.numberOfPages);
    const filteredOperators = 
    this.getOperatorsPerPage(
      operators, 
      (currPage - 1)*pagination.rowsNumber, 
      pagination.rowsNumber*currPage);

    this.setState({
      pagination: {
        currPage: currPage, 
        rowsNumber: pagination.rowsNumber, 
        numberOfPages: pagination.numberOfPages
      },
      filteredOperators: filteredOperators.reverse() 
    });
  }

  getNumOfPages = (operatorsLength, rowsNumber) => {
    return  Math.ceil(operatorsLength / rowsNumber);
  }

  render() {
    const { pagination } = this.state;

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

          <Pagination 
            pagination={pagination}
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdown}
            selectValue={this.selectValue}
            changeCurrPage={this.changeCurrPage}
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
          title={this.state.isInEditMode ? "עדכון מפעיל" : "הוספת מפעיל"}
        />
      </div>
    );
  }
}

export default App;
