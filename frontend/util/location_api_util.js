// find location by Id
export const findLocation = (locationId) => (
    $.ajax({
        method: 'get',
        url: `/api/locations/${locationId}`,
    })
);