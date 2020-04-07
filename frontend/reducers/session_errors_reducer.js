import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER }  from '../actions/session_actions';

const _nullState = {
    login: [],
    logout: [],
    signup: []
}

const sessionErrorsReducer = (state = _nullState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return Object.assign({}, state, {[action.errorType]: action.errors});
        case RECEIVE_CURRENT_USER:
            return _nullState;
        default:
            return state;
    }
};

export default sessionErrorsReducer;