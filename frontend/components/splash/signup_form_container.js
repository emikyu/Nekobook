import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, login } from '../../actions/session_actions'

const msp = state => ({
    errors: state.errors.session.signup,
    formType: 'Sign Up'
});

const mdp = dispatch => ({
    action: (neko) => dispatch(signup(neko)),
    login: (neko) => dispatch(login(neko))
});

export default connect(msp, mdp)(SessionForm);