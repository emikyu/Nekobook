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

export const updateNekoPhoto = (nekoId, photo) => (
    $.ajax({
        url: `/api/nekos/${nekoId}`,
        method: 'patch',
        data: photo,
        contentType: false,
        processData: false
    })
);
