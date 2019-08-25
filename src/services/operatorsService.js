import utilsService from './utilsService';

function getEmptyOperator() {
    return {
        id: 1,
        operatorName: '',
        isManageble: true,
        isFunctional: true,
        ContactMan: "יונתן כהן",
        lastQueryDate: '3/3/2019',
        lastPullDate: '3/3/2019',
        lastCorrectPullDate: '3/3/2019',
        numberOfOperators: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dataPullFrequesncy: '',
        numberOfPreviousStations: 0,
        predictionSystem: '',
        protocolVersion: '',
        addressForTravelQuery: '',
        addressForHistoryQuery: ''
    };
  }

function getOperators(currOperators = null, filterBy = null) {
    let operatorsToReturn = currOperators.data;
    if (filterBy) {
      operatorsToReturn = currOperators.filter(operator => {
        return operator.operatorName.includes(filterBy);
      });
    }
    return operatorsToReturn;
}

function getOperatorById(operators, id) {
  const operatorToEdit = operators.find(operator => {
    return operator.id === id;
  });

  return {...operatorToEdit};
}

function addOperator(operators, operator) {
  operator.id = utilsService.getNextId(operators);
  operators = [...operators, operator];
  return operators;
}

function updateOperator(operators, operator) {
  const operatorIdx = operators.findIndex(
    currOperator => currOperator.id === operator.id
  );
  operators.splice(operatorIdx, 1, operator);
  return operators;
}

export default {
  getEmptyOperator,
  getOperators,
  getOperatorById,
  addOperator,
  updateOperator
};
