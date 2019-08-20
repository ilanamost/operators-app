import { Table } from 'reactstrap';
import React from 'react';

import './OperatorsTable.css'

const OperatorsTable = (props) => {
    const operators = props.operators.map((operator, i) => {
        return (
            <tr key={operator.id}>
              <td> # </td>
              <td> {operator.operatorName}</td>
              <td> {operator.id} </td>
              <td> 
                <div className="option-container">
                    <div className={operator.isManageble? 'option-on' : 'option-off'}></div>
                    <span>{operator.isManageble ? "פעיל" : "תקלה" }</span>
                </div>
             </td>
              <td> 
              <div className="option-container">
                    <div className={operator.isFunctional? 'option-on' : 'option-off'}></div>
                    <span>{operator.isFunctional ? "פעיל" : "תקלה" }</span>
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
}

export default OperatorsTable;