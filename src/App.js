import React, { Component } from "react";
import './App.css';

import OperatorsTable from './components/OperatorsTable/OperatorsTable';
import OperatorsFilter from './components/OperatorsFilter/OperatorsFilter';
import utilsService from './services/utilsService';
import operatorsService from './services/operatorsService';

import { Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Table, 
  Button, 
  FormGroup, 
  Label, 
  Input } from "reactstrap";

class App extends Component {
  state = {
    operators: [],
    filteredOperators: [],
    isOperatorModal: false,
    operator: operatorsService.getEmptyOperator()
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

  render() {
    return (
      <div className="App">
        <div className="search-container">
          <OperatorsFilter onFilter={this.operatorSearch} onAddOperatorClick={this.toggleOperatorModal}/>
        </div>
        <div className="operators-container"> 
          <OperatorsTable operators={this.state.filteredOperators} />
        </div>

        <Modal
          isOpen={this.state.isOperatorModal}
          toggle={() => this.toggleOperatorModal()}
        >
          <ModalHeader toggle={() => this.toggleOperatorModal()}> הוספת מפעיל </ModalHeader>
          <ModalBody>
            <FormGroup>
            <Label for="operatorsNumber">מספר מפעילים במערכת</Label>
            <Input id="operatorsNumber" value={this.state.operator.numberOfOperators} onChange={(e) => {
              let { operator } = this.state;
              operator.numberOfOperators = +e.target.value;
              this.setState({ operator });
            }}/>
            </FormGroup>

            <FormGroup>
            <Label for="firstName">שם פרטי</Label>
            <Input id="firstName" value={this.state.operator.firstName} onChange={(e) => {
              let { operator } = this.state;
              operator.firstName = e.target.value;
              this.setState({ operator });
            }}/>
            </FormGroup>

            <FormGroup>
            <Label for="phone">טלפון</Label>
            <Input id="phone" value={this.state.operator.phone} onChange={(e) => {
              let { operator } = this.state;
              operator.phone = e.target.value;
              this.setState({ operator });
            }}/>
            </FormGroup>

            <FormGroup>
            <Label for="operatorName">שם מפעיל</Label>
            <Input id="operatorName" value={this.state.operator.operatorName} onChange={(e) => {
              let { operator } = this.state;
              operator.operatorName = e.target.value;
              this.setState({ operator });
            }}/>
            </FormGroup>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addOperator()}>
              אישור
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggleOperatorModal()}>
              ביטול
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
