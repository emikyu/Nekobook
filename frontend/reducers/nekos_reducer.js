import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER, RECEIVE_USERS } from '../actions/neko_actions';

const nekosReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, {[action.user.id]: action.user});
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_USER:
            return Object.assign({}, state, {[action.user.id]: action.user});
        case RECEIVE_USERS:
            return Object.assign({}, state, action.users);
        default:
            return state;
    }
};

export default nekosReducer;