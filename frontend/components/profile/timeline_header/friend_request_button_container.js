import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import FriendRequestButton from './friend_request_button';
import { requestNeko, makeFriendRequest, removeFriendRequest, toFriend, toUnfriend } from '../../../actions/neko_actions';

const msp = (state, ownProps) => {
    const showNekoId = ownProps.nekoId;
    const requesterIds = state.entities.nekos[state.session.currentUserId].requester_ids;
    const requesteeIds = state.entities.nekos[state.session.currentUserId].requestee_ids;
    const friendIds = state.entities.nekos[state.session.currentUserId].friend_ids;

    // debugger
    return {
        showNekoId,
        currentUserId: state.session.currentUserId,
        requesterIds,
        requesteeIds,
        friendIds,
        renderedAt: ownProps.renderedAt
    }

};

const mdp = dispatch => ({
    makeFriendRequest: (requesterId, requesteeId) => dispatch(makeFriendRequest(requesterId, requesteeId)),
    removeFriendRequest: (requesterId, requesteeId) => dispatch(removeFriendRequest(requesterId, requesteeId)),
    toFriend: (friendOneId, friendTwoId) => dispatch(toFriend(friendOneId, friendTwoId)),
    toUnfriend: (friendOneId, friendTwoId) => dispatch(toUnfriend(friendOneId, friendTwoId)),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId))
});

export default withRouter(connect(msp, mdp)(FriendRequestButton));