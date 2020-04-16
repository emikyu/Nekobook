import { connect } from 'react-redux';
import Newsfeed from './newsfeed';

const msp = state => ({
    currentUser: state.entities.nekos[state.session.currentUserId]
});

const mdp = dispatch => ({

});

export default connect(msp, mdp)(Newsfeed);