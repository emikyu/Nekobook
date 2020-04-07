import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions'

const msp = state => ({
    errors: state.errors.session.login,
    formType: 'Log In'
});

const mdp = dispatch => ({
    action: (neko) => dispatch(login(neko))
});

export default connect(msp, mdp)(SessionForm);