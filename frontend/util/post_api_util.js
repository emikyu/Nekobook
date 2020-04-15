export const createPost = (post) => (
    $.ajax({
        method: 'post',
        url: '/api/posts',
        data: { post }
    })
);

export const updatePost = (post) => (
    $.ajax({
        method: 'patch',
        url: `/api/posts/${post.id}`,
        data: { post }
    })
);

export const deletePost = (postId) => (
    $.ajax({
        method: 'delete',
        url: `/api/posts/${postId}`
    })
);

export const requestPosts = (nekoId, indexType) => (
    $.ajax({
        method: 'get',
        url: `/api/nekos/${nekoId}/posts`,
        data: { index_type: indexType }
    })
);

export const requestPost = (postId) => (
    $.ajax({
        method: 'get',
        url: `/api/posts/${postId}`,
    })
);