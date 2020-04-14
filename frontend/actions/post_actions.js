import * as PostAPIUtil from '../util/post_api_util';
import { requestNekos, requestNeko } from '../actions/neko_actions';

export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';

const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
});

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
})

export const createPost = (data) => dispatch => (
    PostAPIUtil.createPost(data)
        .then(post => {
            dispatch(receivePost(post));
            dispatch(requestNeko(post.author_id));
        })
);

export const updatePost = (post) => dispatch => (
    PostAPIUtil.updatePost(post)
        .then(post => dispatch(receivePost(post)))
);

export const deletePost = (postId) => dispatch => (
    PostAPIUtil.deletePost(postId)
        .then(post => {
            dispatch(removePost(post.id));
            dispatch(requestNeko(post.wall_id));
        })
);

export const requestPosts = (nekoId, indexType) => dispatch => (
    PostAPIUtil.requestPosts(nekoId, indexType)
        .then(posts => dispatch(receivePosts(posts)))
        .then(() => dispatch(requestNekos(nekoId, indexType)))
);