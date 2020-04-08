import * as NekoAPIUtil from '../util/neko_api_util';
import { requestLocation } from './location_actions';

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const requestNeko = nekoId => dispatch => (
    NekoAPIUtil.findNeko(nekoId)
        .then(user => {
            dispatch(receiveUser(user));
            if (user.location_id) dispatch(requestLocation(user.location_id));
        })
);

export const updateNeko = neko => dispatch => (
    NekoAPIUtil.updateNeko(neko)
        .then(user => {
            dispatch(receiveUser(user));
            if (user.location_id) dispatch(requestLocation(user.location_id));
        })
)