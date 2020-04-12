import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

// testing below
import { requestNekos } from './util/neko_api_util';
// testing above

document.addEventListener("DOMContentLoaded", () => {
    let store;
    // takes into account whether there's a user already logged in
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                nekos: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUserId: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // testing below
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    window.requestNekos = requestNekos;
    // testing above

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});