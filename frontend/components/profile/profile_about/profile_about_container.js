import { connect } from 'react-redux';
import ProfileAbout from './profile_about';
import { requestNeko, updateNeko } from '../../../actions/neko_actions';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
    const nekoId = ownProps.match.params.nekoId;
    const neko = state.entities.nekos[nekoId];
    const location = (neko && neko.location_id) ? state.entities.locations[neko.location_id] : null;

    return {
        nekoId,
        neko,
        canEdit: (nekoId === state.session.currentUserId),
        location
    }
};

const mdp = dispatch => ({
    updateNeko: (neko) => dispatch(updateNeko(neko)),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId))
});

export default withRouter(connect(msp, mdp)(ProfileAbout));
