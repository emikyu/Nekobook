import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import FriendRequestButton from './friend_request_button';
import { requestNeko, makeFriendRequest, removeFriendRequest, toFriend, toUnfriend, updateNeko } from '../../../actions/neko_actions';

const msp = (state, ownProps) => {
    const showNekoId = ownProps.nekoId;
    const requesterIds = state.entities.nekos[state.session.currentUserId].requester_ids;
    const requesteeIds = state.entities.nekos[state.session.currentUserId].requestee_ids;
    const friendIds = state.entities.nekos[state.session.currentUserId].friend_ids;

    let hidden_friends = Array.from(state.entities.nekos[state.session.currentUserId].hidden_friends);
    let isHidden = false;
    if (hidden_friends.includes(showNekoId)) {
        isHidden = true;
        hidden_friends.splice(hidden_friends.indexOf(showNekoId), 1);
    }
    if (hidden_friends.length === 0) hidden_friends = ["none"];
    
    return {
        showNekoId,
        currentUserId: state.session.currentUserId,
        requesterIds,
        requesteeIds,
        friendIds,
        renderedAt: ownProps.renderedAt,
        hidden_friends,
        isHidden
    }

};

const mdp = dispatch => ({
    makeFriendRequest: (requesterId, requesteeId) => dispatch(makeFriendRequest(requesterId, requesteeId)),
    removeFriendRequest: (requesterId, requesteeId) => dispatch(removeFriendRequest(requesterId, requesteeId)),
    toFriend: (friendOneId, friendTwoId) => dispatch(toFriend(friendOneId, friendTwoId)),
    toUnfriend: (friendOneId, friendTwoId) => dispatch(toUnfriend(friendOneId, friendTwoId)),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId)),
    toUnhide: (currentUserId, hidden_friends) => dispatch(updateNeko({id: currentUserId, hidden_friends}))
});

export default withRouter(connect(msp, mdp)(FriendRequestButton));