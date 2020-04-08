import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';
import { requestNeko } from '../../actions/neko_actions'

const msp = (state, ownProps) => {
    const nekoId = ownProps.match.params.nekoId;
    // think about how to make the following more scalable :(
    const neko = state.entities.nekos[nekoId];
    return { nekoId, neko };
};

const mdp = dispatch => ({
    requestNeko: userId => dispatch(requestNeko(userId))
});

export default withRouter(connect(msp, mdp)(Profile));

