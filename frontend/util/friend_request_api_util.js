export const makeFriendRequest = (requesterId, requesteeId) => (
    $.ajax({
        method: 'post',
        url: `/api/friend_requests/${requesterId}/${requesteeId}`
    })
);

export const removeFriendRequest = (requesterId, requesteeId) => (
    $.ajax({
        method: 'delete',
        url: `/api/friend_requests/${requesterId}/${requesteeId}`
    })
);