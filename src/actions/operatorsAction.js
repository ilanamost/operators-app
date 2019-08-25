
import * as actionTypes from './actionTypes';
import utilsService from '../services/utilsService';
import operatorsService from '../services/operatorsService';

const FILE_NAME = "operators";

// export const createOperator = (operator) => {
//     return {
//       type: actionTypes.CREATE_NEW_OPERATOR,
//       payload: operator
//     }
// };

export function createOperator(newOperator) {
  return dispatch => {
    const operators = operatorsService.addOperator(newOperator);
    dispatch(loadOperators(operators));
  };
}

export function loadOperators(filter, operators) {
  return dispatch => {
    let operatorsToReturn;

    if(operators) {
      operatorsToReturn = operatorsService.getOperators(operators, filter);

      dispatch({
        type: actionTypes.GET_ALL_OPERATORS,
        payload: operatorsToReturn
      });
    } else {
      utilsService.loadJSON(FILE_NAME).then((res) => {
        operatorsToReturn = operatorsService.getOperators(res, filter);
        
        dispatch({
          type: actionTypes.GET_ALL_OPERATORS,
          payload: operatorsToReturn
        });
      });
    }
  };
}