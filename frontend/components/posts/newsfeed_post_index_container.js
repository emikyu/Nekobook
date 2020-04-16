import PostIndex from './post_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPosts } from '../../actions/post_actions';
import { requestNekos, updateNeko } from '../../actions/neko_actions';
import { createPost, updatePost, deletePost } from '../../actions/post_actions';


const msp = (state, ownProps) => {
    const nekoId = state.session.currentUserId;
    const neko = state.entities.nekos[nekoId];
    // const wallPosts = neko.wall_post_ids.map(wallPostId => state.entities.posts[wallPostId]).sort((a, b) => {
    //     const dateA = new Date(a.created_at);
    //     const dateB = new Date(b.created_at);
    //     return dateA > dateB ? -1 : 1;
    // });
    const newsfeedPosts = Object.values(state.entities.posts).sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA > dateB ? -1 : 1;
    });
    // debugger
    const newsfeedPosters = newsfeedPosts.some(newsfeedPost => !newsfeedPost) ? null : newsfeedPosts.map(newsfeedPost => state.entities.nekos[newsfeedPost.author_id]);

    return {
        nekoId,
        neko,
        nekos: state.entities.nekos,
        posts: newsfeedPosts,
        posters: newsfeedPosters,
        currentUser: state.entities.nekos[state.session.currentUserId]
    };
};


const mdp = dispatch => ({
    requestPosts: (nekoId) => dispatch(requestPosts(nekoId, "newsfeed")),
    requestNekos: (nekoId) => dispatch(requestNekos(nekoId, "newsfeed")),
    deletePost: (postId) => dispatch(deletePost(postId)),
    updatePost: (post) => dispatch(updatePost(post)),
    updateNeko: (neko) => dispatch(updateNeko(neko))
});

export default withRouter(connect(msp, mdp)(PostIndex));