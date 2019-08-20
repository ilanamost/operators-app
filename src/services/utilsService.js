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

export default {
  loadJSON,
  getNextId
};
