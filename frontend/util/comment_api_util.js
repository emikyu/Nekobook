export const createComment = (comment) => (
    $.ajax({
        method: 'post',
        url: '/api/comments',
        data: { comment }
    })
);

export const updateComment = (comment) => (
    $.ajax({
        method: 'patch',
        url: `/api/comments/${comment.id}`,
        data: {comment}
    })
);

export const deleteComment = (commentId) => (
    $.ajax({
        method: 'delete',
        url: `/api/comments/${commentId}`
    })
);

export const requestComments = (postId) => (
    $.ajax({
        method: 'get',
        url: `/api/posts/${postId}/comments`
    })
);

export const requestAllComments = (nekoId, indexType) => (
    $.ajax({
        method: 'get',
        url: `/api/nekos/${nekoId}/comments`,
        data: {index_type: indexType}
    })
);