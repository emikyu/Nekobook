import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';
import SessionReducer from './session_reducer';
import uiReducer from './ui_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    errors: errorsReducer,
    session: SessionReducer,
    ui: uiReducer
});

export default rootReducer;