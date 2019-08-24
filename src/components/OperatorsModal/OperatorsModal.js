import React, { Component } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";

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
            {this.props.title}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <div className="modal-group">
                <Label for="operatorsNumber">מספר המפעילים במערכת</Label>
                <Input
                  type="number"
                  id="operatorsNumber"
                  className="large-input"
                  value={(this.props.operator.numberOfOperators) ?
                    (this.props.operator.numberOfOperators) : ""}
                  onChange={e => {
                    this.props.onInputChange(e, 'numberOfOperators', true);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="firstName">שם פרטי</Label>
                <Input
                  id="firstName"
                  className="large-input"
                  value={this.props.operator.firstName}
                  onChange={e => {
                    this.props.onInputChange(e, 'firstName', false);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="phone">טלפון</Label>
                <Input
                  id="phone"
                  className="large-input"
                  value={this.props.operator.phone}
                  onChange={e => {
                    this.props.onInputChange(e, 'phone', false);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="dataPullFrequensy">תדירות שליפת מידע</Label>
                <Input
                  id="dataPullFrequensy"
                  className="large-input"
                  value={this.props.operator.dataPullFrequensy}
                  onChange={e => {
                    this.props.onInputChange(e, 'dataPullFrequensy', false);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="numberOfPreviousStations">מספר תחנות קודמות לשליפה</Label>
                <Input
                  type="number"
                  id="numberOfPreviousStations"
                  className="large-input"
                  value={(this.props.operator.numberOfPreviousStations) ?
                    (this.props.operator.numberOfPreviousStations) : ""}
                  onChange={e => {
                    this.props.onInputChange(e, 'numberOfPreviousStations', false);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="predictionSystem">מערכת חיזוי</Label>
                <Input
                  type="select"
                  id="predictionSystem"
                  value={this.props.operator.predictionSystem}
                  onChange={e => {
                    this.props.onInputChange(e, 'predictionSystem', false);
                  }}
                >
                  <option defaultValue=""> Select </option>
                  <option value="1">חיזוי 1</option>
                  <option value="2">חיזוי 2</option>
                  <option value="3">חיזוי 3</option>
                </Input>
              </div>

              <div className="modal-group">
                <Label for="protocolVersion">גרסת פרוטוקול</Label>
                <Input
                  type="select"
                  id="protocolVersion"
                  value={this.props.operator.protocolVersion}
                  onChange={e => {
                    this.props.onInputChange(e, 'protocolVersion', false);
                  }}
                >
                  <option defaultValue=""> Select </option>
                  <option value="1">פרוטוקול 1</option>
                  <option value="2">פרוטוקול 2</option>
                  <option value="3">פרוטוקול 3</option>
                </Input>
              </div>

              <div className="modal-group">
                <Label for="addressForTravelQuery">כתובת לשליפת נסיעות פעילות מתוכננות</Label>
                <Input
                  id="addressForTravelQuery"
                  className="large-input"
                  value={this.props.operator.addressForTravelQuery}
                  onChange={e => {
                    this.props.onInputChange(e, 'addressForTravelQuery', false);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="addressForHistoryQuery">כתובת לשאילת היסטוריה</Label>
                <Input
                  id="addressForHistoryQuery"
                  className="large-input"
                  value={this.props.operator.addressForHistoryQuery}
                  onChange={e => {
                    this.props.onInputChange(e, 'addressForHistoryQuery', false);
                  }}
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="modal-group">
                <Label for="operatorName">שם מפעיל</Label>
                <Input
                  id="operatorName"
                  value={this.props.operator.operatorName}
                  onChange={e => {
                    this.props.onInputChange(e, 'operatorName', false);
                  }}
                />
              </div>

              <div className="modal-group">
                <Label for="lastName">שם משפחה</Label>
                <Input
                  id="lastName"
                  value={this.props.operator.lastName}
                  onChange={e => {
                    this.props.onInputChange(e, 'lastName', false);
                  }}
                />
              </div>

              <div className="modal-group">
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