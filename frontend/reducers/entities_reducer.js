import { combineReducers } from 'redux';
import nekosReducer from './nekos_reducer';
import locationsReducer from './locations_reducer';

const entitiesReducer = combineReducers({
    nekos: nekosReducer,
    locations: locationsReducer
});

export default entitiesReducer;