import { connect } from 'react-redux';
import FriendRequestButton from './friend_request_button';
import { makeFriendRequest, removeFriendRequest } from '../../../actions/neko_actions'

const msp = (state, ownProps) => {
    const showNekoId = ownProps.nekoId;
    const requesterIds = state.entities.nekos[state.session.currentUserId].requester_ids;
    const requesteeIds = state.entities.nekos[state.session.currentUserId].requestee_ids;
    // debugger
    return {
        showNekoId,
        currentUserId: state.session.currentUserId,
        requesterIds,
        requesteeIds
    }

};

const mdp = dispatch => ({
    makeFriendRequest: (requesterId, requesteeId) => dispatch(makeFriendRequest(requesterId, requesteeId)),
    removeFriendRequest: (requesterId, requesteeId) => dispatch(removeFriendRequest(requesterId, requesteeId))
});

export default connect(msp, mdp)(FriendRequestButton);