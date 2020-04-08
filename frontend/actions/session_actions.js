import * as SessionAPIUtil from '../util/session_api_util';
import { requestLocation } from './location_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    user: currentUser
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = (errors, errorType) => ({
    type: RECEIVE_SESSION_ERRORS,
    errorType,
    errors
});

export const login = user => dispatch => (
    SessionAPIUtil.login(user)
        .then(user => {
            dispatch(receiveCurrentUser(user));
            if (user.location_id) dispatch(requestLocation(user.location_id));
        },
        e => dispatch(receiveSessionErrors(e.responseJSON, 'login')))
);

export const logout = () => dispatch => (
    SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()),
        e => dispatch(receiveSessionErrors(e.responseJSON, 'logout')))
);

export const signup = user => dispatch => (
    SessionAPIUtil.signup(user)
        .then(user => dispatch(receiveCurrentUser(user)),
        e => dispatch(receiveSessionErrors(e.responseJSON, 'signup')))
);