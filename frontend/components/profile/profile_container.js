import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';
import { requestNeko } from '../../actions/neko_actions'

const msp = (state, ownProps) => {
    const nekoId = ownProps.match.params.nekoId;
    // think about how to make the following more scalable :(
    const neko = state.entities.nekos[nekoId];
    return { 
        nekoId,
        neko, 
        canEdit: (parseInt(nekoId) === state.session.currentUserId)
    };
};

const mdp = dispatch => ({
    requestNeko: userId => dispatch(requestNeko(userId)),
    updateNekoPhoto: (nekoId, photo) => dispatch(updateNekoPhoto(nekoId, photo))
});

export default withRouter(connect(msp, mdp)(Profile));

