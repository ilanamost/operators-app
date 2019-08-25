import React from "react";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import "./TableCard.scss";

const TableCard = props => {
    return (
        <Card>
        <CardBody onClick={(e) => {
              e.stopPropagation();
        }}>
        <FormGroup className="form-group-first">
          <div className="form-group-top-container">
            <div className="form-group-top-right">
              <Label> {props.operator.firstName}  {props.operator.lastName}</Label>
              <Label> {props.operator.operatorName} </Label>
            </div>

          <div className="form-group-top-left">
            <Label> {props.operator.email} </Label>
            <Label> {props.operator.phone} </Label>
          </div>
          </div>

            <Button onClick={(e) => { 
              props.onToggleOperatorModal(props.operator.id)}} >
              עדכון פרטי המפעיל
            </Button>
          </FormGroup>

          <FormGroup className="second-row-first">
            <Label className="checkmark-container"> מפעיל בתקופת יישום 
            <Input type="checkbox"/>
            <span className="checkmark"></span>
            </Label>

            <Label className="checkmark-container"> שמירת תוכן מסרים
            <Input type="checkbox"/>
            <span className="checkmark"></span>
            </Label>

            <Label className="checkmark-container"> יישום שאילתה היסטורית
            <Input type="checkbox"/>
            <span className="checkmark"></span>
            </Label>
          </FormGroup>
           
           <FormGroup className="second-row-second">
           <div className="table-group">
          <Label for="dataPullFrequensy">תדירות שליפת המידע</Label>
          <Input
              id="dataPullFrequensy"
              value={props.operator.dataPullFrequensy} disabled/>
          </div>

          <div className="table-group">
            <Label for="numberOfPreviousStations">מס' תחנות קודמות לשליפה</Label>
            <Input
             type="number"
              id="numberOfPreviousStations"
              value={props.operator.numberOfPreviousStations}  disabled/>
            </div>
           </FormGroup>

          <FormGroup className="second-row-third">
           <div className="table-group">
          <Label for="predictionSystem">מערכת חיזוי</Label>
          <Input
              type="select"
              id="predictionSystem"
              value={props.operator.predictionSystem}
              disabled>
              <option defaultValue=""> {props.operator.predictionSystem} </option>
        </Input>
          </div>

          <div className="table-group">
            <Label for="numberOfPreviousStations">גרסת פרוטוקול</Label>
            <Input
              type="select"
              id="protocolVersion"
              value={props.operator.protocolVersion}
              disabled>
              <option defaultValue=""> {props.operator.protocolVersion} </option>
            </Input>
            </div>
           </FormGroup>

           <FormGroup className="second-row-fourth">
           <div className="table-group-column">
             <Label>כתובת לשאילתת נסיעות</Label>
             <Label>{props.operator.addressForTravelQuery}</Label>
           </div>

            <div className="input-field-group-column">
             <Label>כתובת לשאילתת היסטוריה</Label>
             <Label>{props.operator.addressForHistoryQuery}</Label>
           </div>
           </FormGroup>
        </CardBody>
      </Card>
    )
}

export default TableCard;