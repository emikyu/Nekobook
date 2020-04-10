import { connect } from 'react-redux';
import ProfileAbout from './profile_about';
import { requestNeko, updateNeko, updateNekoPhoto } from '../../../actions/neko_actions';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const msp = (state, ownProps) => {
    const nekoId = ownProps.match.params.nekoId;
    const neko = state.entities.nekos[nekoId];
    const location = (neko && neko.location_id) ? state.entities.locations[neko.location_id] : null;
    const aboutSection = queryString.parse(ownProps.location.search).section;
    return {
        nekoId,
        neko,
        canEdit: (parseInt(nekoId) === state.session.currentUserId),
        location,
        aboutSection
    }
};

const mdp = dispatch => ({
    updateNeko: (neko) => dispatch(updateNeko(neko)),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId)),
    updateNekoPhoto: (nekoId, photo) => dispatch(updateNekoPhoto(nekoId, photo))
});

export default withRouter(connect(msp, mdp)(ProfileAbout));
