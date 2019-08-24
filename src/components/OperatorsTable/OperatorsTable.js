import React from "react";

import { Table, Collapse } from "reactstrap";

import TableCard from "../TableCard/TableCard";

import "./OperatorsTable.css";

const OperatorsTable = props => {
  const operators = props.operators.map((operator, i) => {
    return (
      <tr
        key={operator.id}
        className={`table-row ${props.rowIndex === i ? "open" : "closed"}`}
      >
        <td
          className="arrow"
          onClick={() => {
            props.toggleRow(i);
          }}
        >
          <div><i className={props.rowIndex === i ? "fa fa-caret-down" : "fa fa-caret-right"}></i></div>
          <Collapse isOpen={props.rowIndex === i ? true : false}>
            <TableCard  operator={operator} onToggleOperatorModal={props.onToggleOperatorModal}/>
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
