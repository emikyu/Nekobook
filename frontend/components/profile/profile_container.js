import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from './profile';
import { requestNeko } from '../../actions/neko_actions'

const msp = (state, ownProps) => {
    const username = ownProps.match.params.username;
    // think about how to make the following more scalable :(
    const neko = Object.values(state.entities.nekos)
                    .find(n => n.username === ownProps.match.params.username);
    return { username, neko };
};

const mdp = dispatch => ({
    requestNeko: username => dispatch(requestNeko(username))
});

export default withRouter(connect(msp, mdp)(Profile));

