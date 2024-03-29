
import * as actionTypes from './actionTypes';
import utilsService from '../services/utilsService';
import operatorsService from '../services/operatorsService';

const FILE_NAME = "operators";

export function createOperator(operators, newOperator) {
  return dispatch => {
    const newOperators = operatorsService.addOperator(operators, newOperator);
    dispatch(loadOperators(newOperators));
  };
}

export function updateOperator(operators, operator) {
  return dispatch => {
    const newOperators = operatorsService.updateOperator(operators, operator);
    
    dispatch({
      type: actionTypes.UPDATE_OPERATOR,
      payload: operator
    });

    dispatch(loadOperators(newOperators));
  };
}

export function loadOperators(operators) {
  return dispatch => {
    let operatorsToReturn;

    if(operators) {
      operatorsToReturn = operatorsService.getOperators(operators, null);

      dispatch({
        type: actionTypes.GET_ALL_OPERATORS,
        payload: operatorsToReturn
      });
    } else {
      utilsService.loadJSON(FILE_NAME).then((res) => {
        operatorsToReturn = operatorsService.getOperators(res.data, null);
        
        dispatch({
          type: actionTypes.GET_ALL_OPERATORS,
          payload: operatorsToReturn
        });
      });
    }
  };
}

export function getFilteredOperators(filter, operators) {
  return dispatch => {
    let operatorsToReturn = operatorsService.getOperators(operators, filter);

      dispatch({
        type: actionTypes.GET_FILTERED_OPERATORS,
        payload: operatorsToReturn
      });
   
  };
}