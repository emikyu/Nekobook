import * as LocationAPIUtil from '../util/location_api_util';

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

const receiveLocation = (location) => ({
    type: RECEIVE_LOCATION,
    location
});

export const requestLocation = locationId => dispatch => (
    LocationAPIUtil.findLocation(locationId)
        .then(location => dispatch(receiveLocation(location)))
);
