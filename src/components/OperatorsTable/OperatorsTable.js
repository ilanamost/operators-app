import React from "react";

import {
  Table,
  Button,
  Collapse,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import "./OperatorsTable.css";

const OperatorsTable = props => {
  const operators = props.operators.map((operator, i) => {
    return (
      <tr
        key={operator.id}
        className={props.rowIndex === i ? "open-row" : "closed-row"}
      >
        <td
          className="arrow"
          onClick={() => {
            props.toggleRow(i);
          }}
        >
          #
          <Collapse isOpen={props.rowIndex === i ? true : false}>
            <Card>
              <CardBody onClick={(e) => {
                    e.stopPropagation();
              }}>
              <FormGroup className="form-group-first">
                <div className="form-group-top-container">
                  <div className="form-group-top-right">
                    <Label> {operator.firstName}  {operator.lastName}</Label>
                    <Label> {operator.operatorName} </Label>
                  </div>

                <div className="form-group-top-left">
                  <Label> {operator.email} </Label>
                  <Label> {operator.phone} </Label>
                </div>
                </div>

                  <Button onClick={(e) => { 
                    props.onToggleOperatorModal(operator.id)}} >
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
                    value={operator.dataPullFrequensy} disabled/>
                </div>

                <div className="table-group">
                  <Label for="numberOfPreviousStations">מס' תחנות קודמות לשליפה</Label>
                  <Input
                   type="number"
                    id="numberOfPreviousStations"
                    value={operator.numberOfPreviousStations}  disabled/>
                  </div>
                 </FormGroup>

                <FormGroup className="second-row-third">
                 <div className="table-group">
                <Label for="predictionSystem">מערכת חיזוי</Label>
                <Input
                    type="select"
                    id="predictionSystem"
                    value={operator.predictionSystem}
                    disabled>
                    <option defaultValue=""> {operator.predictionSystem} </option>
              </Input>
                </div>

                <div className="table-group">
                  <Label for="numberOfPreviousStations">גרסת פרוטוקול</Label>
                  <Input
                    type="select"
                    id="protocolVersion"
                    value={operator.protocolVersion}
                    disabled>
                    <option defaultValue=""> {operator.protocolVersion} </option>
                  </Input>
                  </div>
                 </FormGroup>

                 <FormGroup className="second-row-fourth">
                 <div className="table-group-column">
                   <Label>כתובת לשאילתת נסיעות</Label>
                   <Label>{operator.addressForTravelQuery}</Label>
                 </div>

                  <div className="input-field-group-column">
                   <Label>כתובת לשאילתת היסטוריה</Label>
                   <Label>{operator.addressForHistoryQuery}</Label>
                 </div>
                 </FormGroup>
              </CardBody>
            </Card>
          </Collapse>
        </td>
        <td> {operator.operatorName} </td>
        <td> {operator.id} </td>
        <td>
          <div className="option-container">
            <div
              className={operator.isManageble ? "option option-on" : "option option-off"}
              
            />
            <span>{operator.isManageble ? "פעיל" : "תקלה"}</span>
          </div>
        </td>
        <td>
          <div className="option-container">
            <div
              className={operator.isFunctional ? "option option-on" : "option option-off"}
            />
            <span>{operator.isFunctional ? "פעיל" : "תקלה"}</span>
          </div>
        </td>
        <td> {operator.ContactMan}</td>
        <td> {operator.lastQueryDate}</td>
        <td> {operator.lastPullDate}</td>
        <td> {operator.lastCorrectPullDate}</td>
      </tr>
    );
  });

  return (
    <Table className="operators-table">
      <thead>
        <tr>
          <th> </th>
          <th> שם מפעיל </th>
          <th> מספר המפעיל במערכת </th>
          <th> סטטוס ניהולי </th>
          <th> סטטוס תפעולי </th>
          <th> איש קשר </th>
          <th> מועד שאילתה היסטוריה אחרונה </th>
          <th> מועד שליפה אחרון </th>
          <th> מועד שליפה תקינה אחרונה </th>
        </tr>
      </thead>

      <tbody>{operators}</tbody>
    </Table>
  );
};

export default OperatorsTable;
