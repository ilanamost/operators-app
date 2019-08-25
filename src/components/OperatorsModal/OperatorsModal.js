import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';

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

import "./OperatorsModal.scss";

class OperatorsModal extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      messages: {
        email: 'נא הזן מייל חוקי',
        alpha: 'השדה חייב להכיל תווים בלבד',
        phone: 'השדה חייב להיות טלפון חוקי',
        required: 'שדה חובה',
        default: 'הולדיציה נכשלה'
      },
    });
  }

  submitForm() {
    // if (this.validator.allValid()) {
    //   this.props.onAddOperator();
    // } else {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }

    this.props.onAddOperator();
  }

  cancelSubmit(){
    this.validator.hideMessages();
    this.props.onToggleOperatorModal();
  }

  render() {
    this.validator.purgeFields();
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
                      min="0"
                      id="operatorsNumber"
                      name="operatorsNumber"
                      className="large-input"
                      value={(this.props.operator.numberOfOperators)}
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
                  <div className="validation-label">{this.validator.message('alpha', this.props.operator.firstName, 'required|alpha')}</div>

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
                  <div className="validation-label">{this.validator.message('phone', this.props.operator.phone, 'required|phone')}</div>

                  <div className="modal-group">
                    <Label for="dataPullFrequency">תדירות שליפת מידע</Label>
                    <Input
                      id="dataPullFrequency"
                      name="dataPullFrequency"
                      className="large-input"
                      value={this.props.operator.dataPullFrequency}
                      onChange={e => {
                        this.props.onInputChange(e, 'dataPullFrequency', false);
                      }}
                    />
                  </div>
                  <div className="validation-label">{this.validator.message('alpha', this.props.operator.dataPullFrequensy, 'alpha')}</div>

                  <div className="modal-group">
                    <Label for="numberOfPreviousStations">מספר תחנות קודמות לשליפה</Label>
                    <Input
                      type="number"
                      min="0"
                      id="numberOfPreviousStations"
                      name="numberOfPreviousStations"
                      className="large-input"
                      value={(this.props.operator.numberOfPreviousStations)}
                      onChange={e => {
                        this.props.onInputChange(e, 'numberOfPreviousStations', false);
                      }}
                    />
                  </div>

                  <div className="modal-group select-group">
                    <Label for="predictionSystem">מערכת חיזוי</Label>
                    <div>
                      <Input
                        type="select"
                        id="predictionSystem"
                        name="predictionSystem"
                        className="select-control"
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
                  </div>

                  <div className="modal-group select-group">
                    <Label for="protocolVersion">גרסת פרוטוקול</Label>
                    <div>
                      <Input
                        type="select"
                        id="protocolVersion"
                        name="protocolVersion"
                        className="select-control"
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
                  <div className="validation-label">{this.validator.message('alpha', this.props.operator.addressForTravelQuery, 'alpha')}</div>

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
                  <div className="validation-label">{this.validator.message('alpha', this.props.operator.addressForHistoryQuery, 'alpha')}</div>
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
                  <div className="validation-label">{this.validator.message('alpha', this.props.operator.operatorName, 'required|alpha')}</div>

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
                  <div className="validation-label">{this.validator.message('alpha', this.props.operator.lastName, 'required|alpha')}</div>

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
                  <div className="validation-label">{this.validator.message('email', this.props.operator.email, 'required|email')}</div>

                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" onClick={() => this.submitForm()}>
                  אישור
            </Button>
                <Button
                  color="secondary"
                  onClick={() => this.cancelSubmit()}
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