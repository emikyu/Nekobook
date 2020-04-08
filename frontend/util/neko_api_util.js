export const findNeko = (nekoId) => (
    $.ajax({
        method: 'get',
        url: `/api/nekos/${nekoId}`,
    })
);

export const updateNeko = (neko) => (
    $.ajax({
        method: 'patch',
        url: `/api/nekos/${neko.id}`,
        data: { neko }
    })
);
