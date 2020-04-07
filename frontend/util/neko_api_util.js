// find neko by unique username
export const findNeko = (nekoId) => (
    $.ajax({
        method: 'get',
        url: `/api/nekos/${nekoId}`,
    })
);
