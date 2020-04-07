import * as NekoAPIUtil from '../util/neko_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const requestNeko = username => dispatch => (
    NekoAPIUtil.findNeko(username)
        .then(user => dispatch(receiveUser(user)))
);