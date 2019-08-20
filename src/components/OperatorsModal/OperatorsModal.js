import React, { Component } from "react";

import { Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Table, 
    Button, 
    FormGroup, 
    Label, 
    Input } from "reactstrap";

import "./OperatorsModal.css";

class OperatorsModal extends Component {
  render() {
    return (
      <div className="operator-modal">
        <Modal
          isOpen={this.props.isOperatorModal}
          toggle={() => this.props.onToggleOperatorModal()}
        >
          <ModalHeader toggle={() => this.props.onToggleOperatorModal()}>
            הוספת מפעיל
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="operatorsNumber">מספר מפעילים במערכת</Label>
              <Input
                id="operatorsNumber"
                value={this.props.operator.numberOfOperators}
                onChange={e => {
                  this.props.onInputChange(e, 'numberOfOperators', true);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="firstName">שם פרטי</Label>
              <Input
                id="firstName"
                value={this.props.operator.firstName}
                onChange={e => {
                  this.props.onInputChange(e, 'firstName', false);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="phone">טלפון</Label>
              <Input
                id="phone"
                value={this.props.operator.phone}
                onChange={e => {
                  this.props.onInputChange(e, 'phone', false);
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="operatorName">שם מפעיל</Label>
              <Input
                id="operatorName"
                value={this.props.operator.operatorName}
                onChange={e => {
                  this.props.onInputChange(e, 'operatorName', false);
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.onAddOperator()}>
              אישור
            </Button>
            <Button
              color="secondary"
              onClick={() => this.props.onToggleOperatorModal()}
            >
              ביטול
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default OperatorsModal;