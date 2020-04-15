import * as CommentAPIUtil from '../util/comment_api_util';
import { requestPost } from '../actions/post_actions';
import { requestNeko } from '../actions/neko_actions';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const createComment = data => dispatch => (
    CommentAPIUtil.createComment(data)
        .then(comment => {
            dispatch(receiveComment(comment));
            dispatch(requestPost(comment.post_id));
            dispatch(requestNeko(comment.author_id));
        })
);

export const updateComment = comment => dispatch => (
    CommentAPIUtil.updateComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
);

export const deleteComment = commentId => dispatch => (
    CommentAPIUtil.deleteComment(commentId)
        .then(comment => {
            dispatch(removeComment(comment.id));
            dispatch(requestPost(comment.post_id));
            dispatch(requestNeko(comment.author_id));
        })
);

export const requestComments = postId => dispatch => (
    CommentAPIUtil.requestComments(postId)
        .then(comments => {
            dispatch(receiveComments(comments));
        })
);

export const requestAllComments = (nekoId, indexType) => dispatch => (
    CommentAPIUtil.requestAllComments(nekoId, indexType)
        .then(comments => dispatch(receiveComments(comments)))
)