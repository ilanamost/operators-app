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
                <div className="input-field-group">
                <Label for="operatorsNumber">מספר מפעילים במערכת</Label>
                <Input
                    type = "number"
                    id="operatorsNumber"
                    value={(this.props.operator.numberOfOperators) ? 
                        (this.props.operator.numberOfOperators) : ""}
                    onChange={e => {
                    this.props.onInputChange(e, 'numberOfOperators', true);
                    }}
                />
                </div>
            
               <div className="input-field-group">
                <Label for="firstName">שם פרטי</Label>
                <Input
                    id="firstName"
                    value={this.props.operator.firstName}
                    onChange={e => {
                    this.props.onInputChange(e, 'firstName', false);
                    }}
                />
               </div>
              
              <div className="input-field-group">
                <Label for="phone">טלפון</Label>
                <Input
                    id="phone"
                    value={this.props.operator.phone}
                    onChange={e => {
                    this.props.onInputChange(e, 'phone', false);
                     }}
                />
              </div>
              
              <div className="input-field-group">
                <Label for="dataPullFrequensyy">תדירות שליפת מידע</Label>
                <Input
                    id="dataPullFrequensy"
                    value={this.props.operator.dataPullFrequensy}
                    onChange={e => {
                    this.props.onInputChange(e, 'dataPullFrequensy', false);
                    }}
                />
              </div>
              
              <div className="input-field-group">
                <Label for="numberOfPreviousStations">מספר תחנות קודמות לשליפה</Label>
                <Input
                    type = "number"
                    id="numberOfPreviousStations"
                    value={(this.props.operator.numberOfPreviousStations) ? 
                        (this.props.operator.numberOfPreviousStations) : ""}
                    onChange={e => {
                     this.props.onInputChange(e, 'numberOfPreviousStations', false);
                    }}
                />
              </div>
              
              <div className="input-field-group">
                <Label for="system">מערכת חיווי</Label>
                <Input
                    id="system"
                    value={this.props.operator.system}
                    onChange={e => {
                     this.props.onInputChange(e, 'system', false);
                    }}
                />
              </div>
               
            <div className="input-field-group"> 
                <Label for="protocolVersion">גרסת פרוטוקול</Label>
                <Input
                id="protocolVersion"
                value={this.props.operator.protocolVersion}
                onChange={e => {
                  this.props.onInputChange(e, 'protocolVersion', false);
                }}
              />
            </div>
              
            <div className="input-field-group">
            <Label for="addressForTravelQuery">כתובת לשליפת נסיעות פעילות מתוכננות</Label>
              <Input
                id="addressForTravelQuery"
                value={this.props.operator.addressForTravelQuery}
                onChange={e => {
                  this.props.onInputChange(e, 'addressForTravelQuery', false);
                }}
              />
            </div>
            
            <div className="input-field-group">
            <Label for="addressForHistoryQuery">כתובת לשאילת היסטוריה</Label>
              <Input
                id="addressForHistoryQuery"
                value={this.props.operator.addressForHistoryQuery}
                onChange={e => {
                  this.props.onInputChange(e, 'addressForHistoryQuery', false);
                }}
              />
            </div>
            </FormGroup>

            <FormGroup>
              <div className="input-field-group">
                <Label for="operatorName">שם מפעיל</Label>
                <Input
                id="operatorName"
                value={this.props.operator.operatorName}
                onChange={e => {
                  this.props.onInputChange(e, 'operatorName', false);
                }}
              />
            </div>
             
            <div className="input-field-group">
            <Label for="lastName">שם משפחה</Label>
              <Input
                id="lastName"
                value={this.props.operator.lastName}
                onChange={e => {
                  this.props.onInputChange(e, 'lastName', false);
                }}
              />
            </div>
              
            <div className="input-field-group">
               <Label for="email">דואר אלקטרוני</Label>
               <Input
                id="email"
                value={this.props.operator.email}
                onChange={e => {
                  this.props.onInputChange(e, 'email', false);
                }}
               />
            </div>
           
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