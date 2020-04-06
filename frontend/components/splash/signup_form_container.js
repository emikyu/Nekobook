import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions'

const msp = state => ({
    errors: state.errors.session,
    formType: 'Sign Up'
});

const mdp = dispatch => ({
    action: (neko) => dispatch(signup(neko))
});

export default connect(msp, mdp)(SessionForm);