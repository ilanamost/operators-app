import utilsService from "./utilsService";

const FILE_NAME = "operators";

function getEmptyOperator() {
    return {
        id: 1,
        operatorName: '',
        isManageble: true,
        isFunctional: true,
        ContactMan: '',
        lastQueryDate: '3/3/2019',
        lastPullDate: '3/3/2019',
        lastCorrectPullDate: '3/3/2019',
        numberOfOperators: 0,
        firstName: "",
        lastName: "",
        phone: "",
        dataPullFrequesncy: "",
        numberOfPreviousStations: 0,
        predictionSystem: "",
        protocolVersion: "",
        addressForTravelQuery: "",
        addressForHistoryQuery:  ""
    };
  }

function getOperators(filterBy = null) {
  return utilsService.loadJSON(FILE_NAME).then(operators => {
    let operatorsToReturn = operators.data;

    if (filterBy) {
      operatorsToReturn = operators.data.filter(operator => {
        return operator.operatorName.includes(filterBy);
      });
    }
    return operatorsToReturn;
  });
}

export default {
  getEmptyOperator,
  getOperators
};
