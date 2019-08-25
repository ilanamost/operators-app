import React from 'react';
import { Label, Input } from "reactstrap";
import './SelectGroupInput.scss';

const SelectGroupInput = props => {
    const { field, type, className, operator, onChange, label, options } = props;
    const displayedOptions = options.map((option, i) => {
        return (
        <option value={option}>{option}</option>
        )
    })

    return (
        <div className="modal-group select-group">
        <Label for="predictionSystem">{label}</Label>
        <div>
          <Input
            type={type}
            id={field}
            name={field}
            className={className}
            value={operator.predictionSystem}
            onChange={e => {
                onChange(e);
            }}
          >
            <option defaultValue=""> Select </option>
            {displayedOptions}
          </Input>
        </div>
      </div>
    );
}

export default SelectGroupInput;