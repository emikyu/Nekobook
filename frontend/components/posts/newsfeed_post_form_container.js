import PostForm from './post_form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/post_actions';
import { requestNeko } from '../../actions/neko_actions';

const msp = (state, ownProps) => {
    // const nekoId = ownProps.match.params.nekoId;
    // const neko = state.entities.nekos[nekoId];
    
    const currentUserId = state.session.currentUserId;
    const currentUser = state.entities.nekos[currentUserId];
    // debugger
    // const canPost = (currentUserId === parseInt(nekoId)) || (currentUser.friend_ids.includes(parseInt(nekoId)));

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