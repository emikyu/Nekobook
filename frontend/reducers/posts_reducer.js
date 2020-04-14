import { RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST } from '../actions/post_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const postsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_POST:
            return Object.assign({}, state, {[action.post.id]: action.post});
        case RECEIVE_POSTS:
            return Object.assign({}, action.posts);
        case REMOVE_POST:
            const newState = Object.assign({}, state);
            delete newState[action.postId];
            return newState;
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default postsReducer;