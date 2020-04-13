import { connect } from 'react-redux';
import TimelineFriends from './timeline_friends';
import { withRouter } from 'react-router-dom';
import { requestNeko, requestNekos } from '../../../actions/neko_actions';

const msp = (state, ownProps) => {
    const nekoId = ownProps.match.params.nekoId;
    const neko = state.entities.nekos[nekoId];
    const friends = neko.friend_ids.map(friendId => state.entities.nekos[friendId]);
    const currentUserId = state.session.currentUserId;
    return {
        nekoId,
        neko,
        friends,
        currentUserId
    }
};

const mdp = dispatch => ({
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId)),
    requestNekos: (nekoId, indexType) => dispatch(requestNekos(nekoId, indexType))
});

export default withRouter(connect(msp, mdp)(TimelineFriends));