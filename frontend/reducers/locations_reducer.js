import { RECEIVE_LOCATION } from '../actions/location_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const locationsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LOCATION:
            return Object.assign({}, state, { [action.location.id]: action.location });
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};

export default locationsReducer;