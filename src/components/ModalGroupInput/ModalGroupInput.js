import React from 'react';
import { Label, Input } from "reactstrap";
import './ModalGroupInput.scss';

const ModalGroupInput = props => {
    const { field, type, className, operator, onChange, label, min } = props;
    const value = (operator[field]) ? operator[field] : '';
    
    return (
        <div className="modal-group">
        <Label for={field}>{label}</Label>
        <Input
          type={type}
          min={min}
          id={field}
          name={field}
          className={className}
          value={value}
          onChange={e => {
            onChange(e);
          }}
        />
      </div>
    );
}

export default ModalGroupInput;