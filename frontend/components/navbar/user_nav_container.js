import { connect } from 'react-redux';
import UserNav from './user_nav';
import { logout } from '../../actions/session_actions';

const msp = state => ({

});

const mdp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(msp, mdp)(UserNav);
