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
    dropdownOpen: false
  };

  componentDidMount() {
    utilsService.loadJSON(FILE_NAME).then(res => {
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
    console.log("operators", this.state.operators);
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

          <div className="pagination-container">
            <Button> Next </Button>
            <div className="middle-section">
              <Dropdown
                className="dropdown"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle caret>rows 10</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <FormGroup className="page-section">
                <Label> Page </Label>
                <Input disabled />
                <Label> of 1 </Label>
              </FormGroup>
            </div>
            <Button> Pervious </Button>
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
