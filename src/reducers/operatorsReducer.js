import * as actionTypes from '../actions/actionTypes';
import _ from "lodash";

const initState = {
    operators: [],
    filteredOperators: [],
    operator: null
};

export default (state = initState, action) => {
    let newState = _.cloneDeep(state);
    switch (action.type){
      case actionTypes.GET_ALL_OPERATORS:
        newState.operators = action.payload;
        return newState;
        // return [
        //     ...state,
        //     Object.assign({}, action.contact)
        // ];
      
      case actionTypes.CREATE_NEW_OPERATOR:
      newState.operator = action.payload;
      newState.operators.push(action.payload);
      return newState;

      default:
            return state;
    }
  };