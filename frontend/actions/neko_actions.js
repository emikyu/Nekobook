import * as NekoAPIUtil from '../util/neko_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const requestNeko = nekoId => dispatch => (
    NekoAPIUtil.findNeko(nekoId)
        .then(user => dispatch(receiveUser(user)))
);

export const updateNeko = neko => dispatch => (
    NekoAPIUtil.updateNeko(neko)
        .then(user => dispatch(receiveUser(user)))
)