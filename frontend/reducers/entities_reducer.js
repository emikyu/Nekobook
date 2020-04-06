import { combineReducers } from 'redux';
import nekosReducer from './nekos_reducer';

const entitiesReducer = combineReducers({
    nekos: nekosReducer
});

export default entitiesReducer;