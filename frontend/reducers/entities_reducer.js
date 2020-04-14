import { combineReducers } from 'redux';
import nekosReducer from './nekos_reducer';
import locationsReducer from './locations_reducer';
import postsReducer from './posts_reducer';

const entitiesReducer = combineReducers({
    nekos: nekosReducer,
    locations: locationsReducer,
    posts: postsReducer
});

export default entitiesReducer;