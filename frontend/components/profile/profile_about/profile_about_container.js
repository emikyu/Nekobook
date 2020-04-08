import { connect } from 'react-redux';
import ProfileAbout from './profile_about';

const msp = (state, ownProps) => ({
    neko: state.entities.nekos[ownProps.nekoId],
    canEdit: (ownProps.nekoId === state.session.currentUserId)
});

const mdp = dispatch => ({
    updateNeko: (neko) => dispatch(updateNeko(neko))
});

export default connect(msp, mdp)(ProfileAbout);
