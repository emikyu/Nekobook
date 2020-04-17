import PostForm from './post_form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/post_actions';
import { requestNeko } from '../../actions/neko_actions';

const msp = (state, ownProps) => {

    
    const currentUserId = state.session.currentUserId;
    const currentUser = state.entities.nekos[currentUserId];

    return {
        canPost: true,
        showNeko: currentUser,
        currentUser
    }
};

const mdp = dispatch => ({
    createPost: (data) => dispatch(createPost(data)),
    requestNeko: (nekoId) => dispatch(requestNeko(nekoId))
});

export default withRouter(connect(msp, mdp)(PostForm));