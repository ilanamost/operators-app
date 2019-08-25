import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';

import ModalGroupInput from '../ModalGroupInput/ModalGroupInput';
import SelectGroupInput from '../SelectGroupInput/SelectGroupInput';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
} from "reactstrap";

import "./OperatorsModal.scss";

class OperatorsModal extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      messages: {
        email: 'נא הזן מייל חוקי',
        letters: 'השדה חייב להכיל תווים בלבד',
        phone: 'השדה חייב להיות טלפון חוקי',
        required: 'שדה חובה',
        default: 'הולדיציה נכשלה'
      },
      validators: {
        letters: { 
          message: 'השדה חייב להכיל תווים בלבד',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/^[a-z\u0590-\u05ff]+$/i)
          },
        }
      }
    });
  }

  submitForm() {
    if (this.validator.allValid()) {
      this.props.onAddOperator();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  cancelSubmit(){
    this.validator.hideMessages();
    this.validator.purgeFields();
    this.props.onToggleOperatorModal();
  }

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
                  <ModalGroupInput 
                    field={'numberOfOperators'} 
                    type={'number'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'מספר המפעילים במערכת'}
                    min={0}
                    onChange={e => {
                      this.props.onInputChange(e, 'numberOfOperators', true);
                  }}/>   

                  <ModalGroupInput 
                    field={'firstName'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'שם פרטי'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'firstName', false);
                    }}/>   
                  <div className="validation-label">{this.validator.message('letters', this.props.operator.firstName, 'required|letters')}</div>

                  <ModalGroupInput 
                    field={'phone'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'טלפון'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'phone', false);
                    }}/>   
                  <div className="validation-label">{this.validator.message('phone', this.props.operator.phone, 'phone')}</div>

                  <ModalGroupInput 
                    field={'dataPullFrequency'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'תדירות שליפת מידע'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'dataPullFrequency', false);
                    }}/>  
                  <div className="validation-label">{this.validator.message('letters', this.props.operator.dataPullFrequency, 'letters')}</div>
                  
                  <ModalGroupInput 
                    field={'numberOfPreviousStations'} 
                    type={'number'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'מספר תחנות קודמות לשליפה'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'numberOfPreviousStations', false);
                  }}/>  

                  <SelectGroupInput
                    field={'predictionSystem'}
                    type={'select'}
                    className={'select-control'}
                    operator={this.props.operator}
                    onChange={e => {
                      this.props.onInputChange(e, 'predictionSystem', false);
                    }}
                    label={'מערכת חיזוי'}
                    options={['חיזוי 1', 'חיזוי 2', 'חיזוי 3']}
                  />  
                  
                  <SelectGroupInput
                    field={'protocolVersion'}
                    type={'select'}
                    className={'select-control'}
                    operator={this.props.operator}
                    onChange={e => {
                      this.props.onInputChange(e, 'protocolVersion', false);
                    }}
                    label={'גרסת פרוטוקול'}
                    options={['פרוט 1', 'פרוט 2', 'פרוט 3']}
                  />  

                  <ModalGroupInput 
                    field={'addressForTravelQuery'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'כתובת לשליפת נסיעות פעילות מתוכננות'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'addressForTravelQuery', false);
                  }}/> 
                  <div className="validation-label">{this.validator.message('letters', this.props.operator.addressForTravelQuery, 'letters')}</div>
                  
                  <ModalGroupInput 
                    field={'addressForHistoryQuery'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'כתובת לשאילת היסטוריה'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'addressForHistoryQuery', false);
                  }}/> 
                  <div className="validation-label">{this.validator.message('letters', this.props.operator.addressForHistoryQuery, 'letters')}</div>
                </FormGroup>

                <FormGroup>
                  <ModalGroupInput 
                    field={'operatorName'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'שם מפעיל'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'operatorName', false);
                  }}/>
                  <div className="validation-label">{this.validator.message('letters', this.props.operator.operatorName, 'required|letters')}</div>

                  <ModalGroupInput 
                    field={'lastName'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'שם משפחה'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'lastName', false);
                  }}/>
                  <div className="validation-label">{this.validator.message('letters', this.props.operator.lastName, 'required|letters')}</div>

                  <ModalGroupInput 
                    field={'email'} 
                    type={'text'} 
                    className={'large-input'}
                    operator={this.props.operator}
                    label={'דואר אלקטרוני'}
                    min={0}
                    onChange={e => {
                    this.props.onInputChange(e, 'email', false);
                  }}/>
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