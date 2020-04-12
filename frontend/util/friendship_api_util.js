export const toFriend = (friendOneId, friendTwoId) => (
    $.ajax({
        method: 'post',
        url: `/api/friendships/${friendOneId}/${friendTwoId}`
    })
);

export const toUnfriend = (friendOneId, friendTwoId) => (
    $.ajax({
        method: 'delete',
        url: `/api/friendships/${friendOneId}/${friendTwoId}`
    })
);