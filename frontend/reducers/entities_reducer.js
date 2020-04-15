import { combineReducers } from 'redux';
import nekosReducer from './nekos_reducer';
import locationsReducer from './locations_reducer';
import postsReducer from './posts_reducer';
import commentsReducer from './comments_reducer';

const entitiesReducer = combineReducers({
    nekos: nekosReducer,
    locations: locationsReducer,
    posts: postsReducer,
    comments: commentsReducer
});

export default entitiesReducer;