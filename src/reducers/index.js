import { combineReducers } from 'redux';
import operatorsReducer from './operatorsReducer';

export default combineReducers({
    operatorsReducer: operatorsReducer
});