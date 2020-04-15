import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import {withRouter} from 'react-router-dom';
import { requestComments, createComment, deleteComment, updateComment } from '../../actions/comment_actions';

const msp = (state, ownProps) => {
    // const nekoId = ownProps.match.params.nekoId;
    // const neko = state.entities.nekos[nekoId];
    const currentUser = state.entities.nekos[state.session.currentUserId];
    const postId = ownProps.postId;
    const post = state.entities.posts[postId];
    const comments = post.comment_ids.map(commentId => state.entities.comments[commentId]).sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA < dateB ? -1 : 1;
    });
    const commenters = comments.some(comment => !comment) ? null : comments.map(comment => state.entities.nekos[comment.author_id]);
    // const canComment = (currentUser.id === parseInt(nekoId)) || (currentUser.friend_ids.includes(parseInt(nekoId)));


    return {
        // showNeko: neko,
        currentUser,
        postId,
        post,
        comments,
        commenters,
        nekos: state.entities.nekos,
        canComment: true
    }


};

const mdp = dispatch => ({
    requestComments: (postId) => dispatch(requestComments(postId)),
    createComment: (data) => dispatch(createComment(data)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
});

export default withRouter(connect(msp, mdp)(CommentIndex));