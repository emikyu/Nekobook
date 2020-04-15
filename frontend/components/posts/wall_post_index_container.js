import PostIndex from './post_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPosts } from '../../actions/post_actions';
import { requestNekos } from '../../actions/neko_actions';
import { createPost, updatePost, deletePost } from '../../actions/post_actions';


const msp = (state, ownProps) => {
    const nekoId = ownProps.match.params.nekoId;
    const neko = state.entities.nekos[nekoId];
    const wallPosts = neko.wall_post_ids.map(wallPostId => state.entities.posts[wallPostId]).sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA > dateB ? -1 : 1;
    });
    // debugger
    const wallPosters = wallPosts.some(wallPost => !wallPost) ? null : wallPosts.map(wallPost => state.entities.nekos[wallPost.author_id]);

    return {
        nekoId,
        neko,
        nekos: state.entities.nekos,
        posts: wallPosts,
        posters: wallPosters,
        currentUser: state.entities.nekos[state.session.currentUserId]
    };
};


const mdp = dispatch => ({
    requestPosts: (nekoId) => dispatch(requestPosts(nekoId, "wall")),
    requestNekos: (nekoId) => dispatch(requestNekos(nekoId, "wall")),
    deletePost: (postId) => dispatch(deletePost(postId)),
    updatePost: (post) => dispatch(updatePost(post))
});

export default withRouter(connect(msp, mdp)(PostIndex));