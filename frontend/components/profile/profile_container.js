import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';
import { requestNeko } from '../../actions/neko_actions'

const msp = (state, ownProps) => ({
    nekoId: ownProps.match.params.nekoId,
    neko: state.entities.nekos[ownProps.match.params.nekoId]
});

const mdp = dispatch => ({
    requestNeko: nekoId => dispatch(requestNeko(nekoId))
});

export default withRouter(connect(msp, mdp)(Profile));

