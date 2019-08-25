import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadOperators, 
         getFilteredOperators, 
         createOperator, 
         updateOperator } 
from "./actions/operatorsAction";
import { bindActionCreators } from 'redux';
import "./App.scss";

import OperatorsTable from "./components/OperatorsTable/OperatorsTable";
import OperatorsFilter from "./components/OperatorsFilter/OperatorsFilter";
import OperatorsModal from "./components/OperatorsModal/OperatorsModal";
import Pagination from "./components/Pagination/Pagination";

import operatorsService from "./services/operatorsService";
import utilsService from "./services/utilsService";

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
    this.props.loadOperators(null, null);
  }

  componentWillReceiveProps(nextProps) {
     if (nextProps.filteredOperators.length) {
      this.changeStateOnFilteredOperatorsLoad(nextProps);
     } 

     else if (nextProps.operator) {
      (nextProps.operator.id) ? 
      this.changeStateOnOperatorUpdate(nextProps):
      this.changeStateOnOperatorAdd(nextProps);
     }
     
     else if(nextProps.operators.length) {
      this.changeStateOnOperatorsLoad(nextProps);
     }
  }

  changeStateOnOperatorsLoad(nextProps) {
    const { pagination } = this.state;
    const operators = nextProps.operators;
    const numberOfPages = utilsService.getNumOfPages(operators.length , pagination.rowsNumber);
    const rowsNumber = 5;
    const filteredOperators = 
    operatorsService.getOperatorsPerPage(
      operators, 
      (pagination.currPage - 1)*rowsNumber, 
      rowsNumber*pagination.currPage);

    this.setState({
      operators: nextProps.operators,
      operator: operatorsService.getEmptyOperator(),
      pagination: {
        currPage: 1, 
        rowsNumber: rowsNumber, 
        numberOfPages: numberOfPages
      },
      filteredOperators: filteredOperators.reverse()
    });
  }

  changeStateOnFilteredOperatorsLoad(nextProps) {
    const { pagination } = this.state;
    let filteredOperators;
    const operators = nextProps.filteredOperators;
    const currPage = 1;

    filteredOperators = operatorsService.getOperatorsPerPage(
        operators, 
        (currPage - 1)*pagination.rowsNumber, 
        pagination.rowsNumber*currPage);

    this.setState({
      filteredOperators: filteredOperators.reverse(),
      isOperatorModal: false,
      pagination: {
        rowsNumber: pagination.rowsNumber,
        currPage: currPage,
        numberOfPages: pagination.numberOfPages
      }
    });
  }
  
  changeStateOnOperatorUpdate(nextProps) {
    let { pagination } = this.state;
    const newOperators = nextProps.operators;

    const filteredOperators = operatorsService.getOperatorsPerPage(
      newOperators, 
      (pagination.currPage - 1)*pagination.rowsNumber, 
      pagination.rowsNumber*pagination.currPage);

    this.setState({
      operators: newOperators,
      filteredOperators: filteredOperators.reverse(),
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator()
    });
  }

  changeStateOnOperatorAdd(nextProps) {
    let { pagination } = this.state;
    const newOperators = nextProps.operators;
    this.changeStateOnOperatorUpdate(nextProps);
    const numberOfPages = utilsService.getNumOfPages(newOperators.length , pagination.rowsNumber);

    this.setState({
      pagination: {
        numberOfPages: numberOfPages,
        currPage: pagination.currPage, 
        rowsNumber: pagination.rowsNumber,
      }
    });
  }

  operatorSearch = term => {
    const { operators } = this.state;
    this.props.getFilteredOperators(term, operators);
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
    let { operators, operator } = this.state;
    this.props.createOperator(operators, operator);
  };

  updateOperator = () => {
    let { operators, operator } = this.state;
    this.props.updateOperator(operators, operator);
    this.setState({ openRowIndex: -1 });
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
    this.setState({ dropdownOpen: !dropdownOpen });
  };

  selectValue = (rowsNumber) => {
    const { operators } = this.state;
    const numberOfPages = utilsService.getNumOfPages(operators.length, rowsNumber);
    const currPage = 1;
    const filteredOperators = 
    operatorsService.getOperatorsPerPage(
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

  changeCurrPage = (direction) => {
    const { operators, pagination } = this.state;
    let currPage = pagination.currPage;
    currPage = utilsService.getCurrPage(direction, currPage, pagination.numberOfPages);
    const filteredOperators = 
    operatorsService.getOperatorsPerPage(
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

const mapStateToProps = state => {
  return {
    operators: state.operatorsReducer.operators,
    filteredOperators: state.operatorsReducer.filteredOperators,
    operator: state.operatorsReducer.operator
  };
};

const mapActionsToProps = dispatch => {
  return bindActionCreators({ 
    loadOperators, 
    getFilteredOperators, 
    createOperator,
    updateOperator }, 
    dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(App);

