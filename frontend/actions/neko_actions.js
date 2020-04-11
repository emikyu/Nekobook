import * as NekoAPIUtil from '../util/neko_api_util';
import { requestLocation } from './location_actions';
import * as FriendRequestAPIUtil from '../util/friend_request_api_util';

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
);

export const updateNekoPhoto = (nekoId, photo) => dispatch => (
    NekoAPIUtil.updateNekoPhoto(nekoId, photo)
        .then(user => { 
            // dispatch(updateNeko(user)); // *** testing something...
            dispatch(receiveUser(user));
        })
);

export const makeFriendRequest = (requesterId, requesteeId) => dispatch => (
    FriendRequestAPIUtil.makeFriendRequest(requesterId, requesteeId)
        .then(user => {
            dispatch(receiveUser(user));
        })
);

export const removeFriendRequest = (requesterId, requesteeId) => dispatch => (
    FriendRequestAPIUtil.removeFriendRequest(requesterId, requesteeId)
        .then(user => {
            dispatch(receiveUser(user));
        })
);