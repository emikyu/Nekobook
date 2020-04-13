import { connect } from 'react-redux';
import UserNav from './user_nav';
import { logout } from '../../actions/session_actions';
import { requestNeko, requestNekos } from '../../actions/neko_actions';

const msp = (state, ownProps) => ({
    currentUser: state.entities.nekos[state.session.currentUserId],
    currentUserId: state.session.currentUserId
});

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId))
});

export default connect(msp, mdp)(UserNav);
