import { connect } from 'react-redux';
import FriendRequests from './friend_requests';
import { requestNeko, requestNekos, removeFriendRequest, toFriend} from '../../actions/neko_actions';

const msp = (state) => {

    const currentUser = state.entities.nekos[state.session.currentUserId];
    const requesters = currentUser.requester_ids.map(id => state.entities.nekos[id]);

    return {
        currentUser,
        requesters

    }

};

const mdp = dispatch => ({
    removeFriendRequest: (requesterId, requesteeId) => dispatch(removeFriendRequest(requesterId, requesteeId)),
    toFriend: (friendOneId, friendTwoId) => dispatch(toFriend(friendOneId, friendTwoId)),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId)),
    requestNekos: (nekoId, indexType) => dispatch(requestNekos(nekoId, indexType))
});


export default connect(msp, mdp)(FriendRequests);