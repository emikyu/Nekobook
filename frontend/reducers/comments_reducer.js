import { RECEIVE_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT } from '../actions/comment_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_POSTS } from '../actions/post_actions';

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {[action.comment.id]: action.comment});
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, action.comments);
        case REMOVE_COMMENT:
            const newState = Object.assign({}, state);
            delete newState[action.commentId];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_POSTS:
            return {};
        default:
            return state;
    }
}

export default commentsReducer;