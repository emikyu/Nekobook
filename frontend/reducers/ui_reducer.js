import { RECEIVE_NAMES, RECEIVE_SEARCH_RESULTS } from '../actions/neko_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const _nullUi = {
    allNames: null,
    searchResults: null
};

const uiReducer = (state = _nullUi, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_NAMES:
            return Object.assign({}, state, {allNames: action.names});
        case RECEIVE_SEARCH_RESULTS:
            return Object.assign({}, state, {searchResults: action.searchResults});
        case LOGOUT_CURRENT_USER:
            return _nullUi;
        default:
            return state;
    }

}

export default uiReducer;