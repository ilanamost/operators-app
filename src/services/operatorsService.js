function getEmptyOperator() {
    return {
        id: 1,
        operatorName: '',
        isManageble: true,
        isFunctional: true,
        ContactMan:  "יונתן כהן",
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
    let operatorsToReturn = currOperators;
    if (filterBy) {
      operatorsToReturn = currOperators.filter(operator => {
        return operator.operatorName.includes(filterBy);
      });
    }
    return operatorsToReturn;
}

export default {
  getEmptyOperator,
  getOperators
};
