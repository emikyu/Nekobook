// find neko by unique username
export const findNeko = (username) => (
    $.ajax({
        method: 'get',
        url: '/api/nekos/0',
        data: { username }
    })
);
