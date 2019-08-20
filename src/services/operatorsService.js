import utilsService from "./utilsService";

const FILE_NAME = "operators";

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
  getOperators
};
