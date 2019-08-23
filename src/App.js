import React, { Component } from "react";
import "./App.css";

import OperatorsTable from "./components/OperatorsTable/OperatorsTable";
import OperatorsFilter from "./components/OperatorsFilter/OperatorsFilter";
import OperatorsModal from "./components/OperatorsModal/OperatorsModal";

import utilsService from "./services/utilsService";
import operatorsService from "./services/operatorsService";

import {
  Table,
  Button,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup
} from "reactstrap";

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
      rowsNumber: 10,
      numberOfPages: 0
    }
  };

  componentDidMount() {
    utilsService.loadJSON(FILE_NAME).then(res => {
      this.setState({
        operators: res.data,
        filteredOperators: res.data,
        operator: operatorsService.getEmptyOperator()
      });

      const { operators, pagination } = this.state;
      const numberOfPages =  this.getNumOfPages(operators.length , pagination.rowsNumber);
      const rowsNumber = 10;
      const filteredOperators = 
      this.getOperatorsPerPage(
        operators, 
        (pagination.currPage - 1)*rowsNumber, 
        rowsNumber*pagination.currPage);
  
      this.setState({
        pagination: {
          currPage: 1, 
          rowsNumber: rowsNumber, 
          numberOfPages: numberOfPages,
          filteredOperators: filteredOperators 
        }
      });
    });
  }

  getOperatorsPerPage = (operators, startIndex, rowsNumber) => {
    return operators.slice(startIndex, rowsNumber);
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
    const newOperators = operatorsService.addOperator(operators, operator);

    this.setState({
      operators: newOperators,
      filteredOperators: newOperators,
      isOperatorModal: false,
      operator: operatorsService.getEmptyOperator()
    });
  };

  updateOperator = () => {
    let { operators, operator } = this.state;
    const newOperators = operatorsService.updateOperator(operators, operator);

    this.setState({
      operators: newOperators,
      filteredOperators: newOperators,
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

  toggleDropdown = () => {
    let { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  };

  selectValue = (rowsNumber) => {
    const { operators, pagination } = this.state;
    const numberOfPages =  this.getNumOfPages(operators.length, rowsNumber);
    const filteredOperators = 
    this.getOperatorsPerPage(
      operators, 
      (pagination.currPage - 1)*rowsNumber, 
      rowsNumber*pagination.currPage);

    this.setState({
      pagination: {
        currPage: pagination.currPage, 
        rowsNumber: rowsNumber, 
        numberOfPages: numberOfPages,
        filteredOperators: filteredOperators
      }
    });
  }

  changeCurrPage = (direction) => {
    const { operators, pagination } = this.state;
    let currPage = pagination.currPage;
    
    switch(direction) {
      case 'next':
        if(currPage < pagination.numberOfPages) {
          currPage++;
        }
        break;
      case 'pervious':
        if(currPage > 1) {
          currPage--;
        }
        break;
    }

    const filteredOperators = 
    this.getOperatorsPerPage(
      operators, 
      (currPage - 1)*pagination.rowsNumber, 
      pagination.rowsNumber*currPage);

    this.setState({
      pagination: {
        currPage: currPage, 
        rowsNumber: pagination.rowsNumber, 
        numberOfPages: pagination.numberOfPages,
        filteredOperators: filteredOperators 
      }
    });
  }

  getNumOfPages = (operatorsLength, rowsNumber) => {
    return  operatorsLength / rowsNumber;
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

          <div className="pagination-container">
            <Button onClick={(e) => {
                e.stopPropagation();
                this.changeCurrPage('next');
              }}> Next </Button>
            <div className="middle-section">
              <Dropdown
                className="dropdown"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle caret> rows { pagination.rowsNumber} </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={(e) => {
                    e.stopPropagation();
                    this.selectValue(10);
                    }}>rows 10</DropdownItem>

                    <DropdownItem onClick={(e) => {
                    e.stopPropagation();
                    this.selectValue(5);
                    }}>rows 5</DropdownItem>

                    <DropdownItem onClick={(e) => {
                    e.stopPropagation();
                    this.selectValue(2);
                    }}>rows 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <FormGroup className="page-section">
                <Label> Page </Label>
                <Input disabled value={ pagination.currPage }/>
                <Label> of { pagination.numberOfPages } </Label>
              </FormGroup>
            </div>
            <Button  onClick={(e) => {
              e.stopPropagation();
              this.changeCurrPage('pervious');
            }}> Pervious </Button>
          </div>
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
