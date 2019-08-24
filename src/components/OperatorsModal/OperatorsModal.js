import React, { Component } from "react";
import { Formik } from 'formik';
import { operatorsValidationSchema } from "../../schema/operatorsValidationSchema";
import operatorsService from "../../services/operatorsService";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import "./OperatorsModal.css";

class OperatorsModal extends Component {

  generateInitialValues = () => {
		return {
      operatorsNumber: 0,
      firstName: '',
      phone: '',
      dataPullFrequensy:'',
      numberOfPreviousStations: 0,
      predictionSystem: '',
      protocolVersion: '',
      addressForTravelQuery: '',
      addressForHistoryQuery: '',
      operatorName: '',
      lastName: '',
      email: ''
		};
  };

  handleSubmit = (values) => {
    const { onAddOperator } = this.props;

    onAddOperator({
      operatorsNumber: values.operatorsNumber,
      firstName: values.firstName,
      phone: values.phone,
      dataPullFrequensy: values.dataPullFrequensy,
      numberOfPreviousStations: values.numberOfPreviousStations,
      predictionSystem: values.predictionSystem,
      protocolVersion: values.protocolVersion,
      addressForTravelQuery: values.addressForTravelQuery,
      addressForHistoryQuery: values.addressForHistoryQuery,
      operatorName: values.operatorName,
      lastName: values.lastName,
      email: values.email
    });
  }
  

  render() {
    return (
      <Formik 
        initialValues={this.generateInitialValues()}
        validationSchema={operatorsValidationSchema}
        onSubmit={() => 
          {console.log("sudmitted without errors")}
          }>
      {props => (
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
                  name="operatorsNumber"
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
                  name="firstName"
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
                  name="phone"
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
                  name="dataPullFrequensy"
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
                  name="numberOfPreviousStations"
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
                  name="predictionSystem"
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
                  name="protocolVersion"
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
                  name="addressForTravelQuery"
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
                  name="addressForHistoryQuery"
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
                  name="operatorName"
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
                  name="lastName"
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
                  name="email"
                  value={this.props.operator.email}
                  onChange={e => {
                    this.props.onInputChange(e, 'email', false);
                  }}
                />
              </div>

            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={() => this.props.onAddOperator()}>
            {/* <Button color="primary" type="submit"> */}
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
      )}
      </Formik>
    );
  }
}

export default OperatorsModal;