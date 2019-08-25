import axios from 'axios';

function loadJSON(fileName) {
  return axios.get(`/data/${fileName}.json`);
}

function getNextId(items) {
  var max = 0;
  items.forEach((item) => {
      if (item.id > max) max = item.id;
  })
  return max+1;
}

function getCurrPage(direction, currPage, numberOfPages){
  switch(direction) {
    case 'next':
      if(currPage < numberOfPages) {
        return ++currPage;
      }
      return currPage;

    case 'previous':
      if(currPage > 1) {
        return --currPage;
      }
      return currPage;
      
    default:
      return currPage;
  }
}

function getNumOfPages(operatorsLength, rowsNumber) {
  return  Math.ceil(operatorsLength / rowsNumber);
}

export default {
  loadJSON,
  getNextId,
  getCurrPage,
  getNumOfPages
};
