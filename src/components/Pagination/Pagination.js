import React from "react";

import {
    Button,
    Label,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup
} from "reactstrap";

import "./Pagination.css";

const Pagination = props => {
    return (
        <div className="pagination-container">
            <Button onClick={(e) => {
                e.stopPropagation();
                props.changeCurrPage('next');
            }}> Next </Button>
            <div className="middle-section">
                <Dropdown
                    className="dropdown"
                    isOpen={props.isOpen}
                    toggle={props.toggle}
                >
                    <DropdownToggle caret> rows {props.pagination.rowsNumber} </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={(e) => {
                            e.stopPropagation();
                            props.selectValue(10);
                        }}>rows 10</DropdownItem>

                        <DropdownItem onClick={(e) => {
                            e.stopPropagation();
                            props.selectValue(5);
                        }}>rows 5</DropdownItem>

                        <DropdownItem onClick={(e) => {
                            e.stopPropagation();
                            props.selectValue(2);
                        }}>rows 2</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <FormGroup className="page-section">
                    <Label> Page </Label>
                    <Input disabled value={props.pagination.currPage} />
                    <Label> of {props.pagination.numberOfPages} </Label>
                </FormGroup>
            </div>
            <Button onClick={(e) => {
                e.stopPropagation();
                props.changeCurrPage('pervious');
            }}> Pervious </Button>
        </div>
    )
}

export default Pagination;