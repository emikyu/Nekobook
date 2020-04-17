import * as NekoAPIUtil from '../util/neko_api_util';
import { requestLocation } from './location_actions';
import * as FriendRequestAPIUtil from '../util/friend_request_api_util';
import * as FriendshipAPIUtil from '../util/friendship_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_NAMES = 'RECEIVE_NAMES';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
});

const receiveSearchResults = (searchResults) => ({
    type: RECEIVE_SEARCH_RESULTS,
    searchResults
});

const receiveNames = (names) => ({
    type: RECEIVE_NAMES,
    names
})

export const searchNekos = query => dispatch => (
    NekoAPIUtil.searchNekos(query)
        .then(searchResults => dispatch(receiveSearchResults(searchResults)))
);

export const requestNeko = nekoId => dispatch => (
    NekoAPIUtil.findNeko(nekoId)
        .then(user => {
            dispatch(receiveUser(user));
            if (user.location_id) dispatch(requestLocation(user.location_id));
        })
);

export const requestNekos = (nekoId, indexType) => dispatch => (
    NekoAPIUtil.requestNekos(nekoId, indexType)
        .then(users => dispatch(receiveUsers(users)))
);

export const requestNekoNames = (nekoId) => dispatch => (
    NekoAPIUtil.requestNekos(nekoId, "allnames")
        .then(names => dispatch(receiveNames(names)))
)


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

export const toFriend = (friendOneId, friendTwoId) => dispatch => (
    FriendshipAPIUtil.toFriend(friendOneId, friendTwoId)
        .then(user => dispatch(receiveUser(user)))
)

export const toUnfriend = (friendOneId, friendTwoId) => dispatch => (
    FriendshipAPIUtil.toUnfriend(friendOneId, friendTwoId)
        .then(user => dispatch(receiveUser(user)))
)