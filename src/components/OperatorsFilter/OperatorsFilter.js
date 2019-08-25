import React, { Component } from 'react';
import { Button, Input } from "reactstrap";
import './OperatorsFilter.scss';

class OperatorsFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {term: ''};
    }

    onInputChange = (ev) => {
        const term = ev.target.value;
        this.setState({term});
        this.props.onFilter(term);
    }

    onAddOperatorClick = () => {
        this.props.onAddOperatorClick();
    }

    render () {
        return (
            <div className="operator-filter">
                <Input
                    placeholder="חיפוש"
                    value={this.state.term}
                    onChange={this.onInputChange} />
                <Button onClick={this.onAddOperatorClick} > הוספת מפעיל </Button>
                <h3> ניהול מפעילים</h3>
            </div>
        );
    } 
}

export default OperatorsFilter;