import React, { Component } from 'react';

import './OperatorsFilter.css';

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
                <input
                    placeholder="חיפוש"
                    value={this.state.term}
                    onChange={this.onInputChange} />
                <button onClick={this.onAddOperatorClick} > הוספת מפעיל </button>
                <h3> ניהול מפעילים</h3>
            </div>
        );
    } 
}

export default OperatorsFilter;