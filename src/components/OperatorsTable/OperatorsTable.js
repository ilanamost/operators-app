import React from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
  Card,
  CardBody
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
              <CardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
                <Button onClick={() => { props.onToggleOperatorModal(operator.id)}} >
                 עדכון פרטי המפעיל
                </Button>
              </CardBody>
            </Card>
          </Collapse>
        </td>
        <td> {operator.operatorName} </td>
        <td> {operator.id} </td>
        <td>
          <div className="option-container">
            <div
              className={operator.isManageble ? "option-on" : "option-off"}
            />
            <span>{operator.isManageble ? "פעיל" : "תקלה"}</span>
          </div>
        </td>
        <td>
          <div className="option-container">
            <div
              className={operator.isFunctional ? "option-on" : "option-off"}
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
