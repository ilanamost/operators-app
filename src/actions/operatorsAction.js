
import * as actionTypes from './actionTypes';
import utilsService from '../services/utilsService';
import operatorsService from '../services/operatorsService';

const FILE_NAME = "operators";

export function createOperator(newOperator) {
  return dispatch => {
    const operators = operatorsService.addOperator(newOperator);
    dispatch(loadOperators(operators));
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