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

    window.onclick = (event) => {
        if (!event.target.matches('.trigger')) {
            // window.alert('hello!')
            const dropdowns = document.getElementsByClassName("triggered-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show-dropdown')) {
                    openDropdown.classList.remove('show-dropdown');
                }
            }
            const selected = document.getElementsByClassName("trigger-icon");
            for (let i = 0; i < selected.length; i++) {
                const icon = selected[i];
                if (icon.classList.contains('selected')) {
                    icon.classList.remove('selected');
                }
            }

        }

        if (event.target.matches('.modal')) {
            const modals = document.getElementsByClassName('modal');
            for (let i = 0; i < modals.length; i++) {
                const openModal = modals[i];
                if (openModal.classList.contains('show-modal')) openModal.classList.remove('show-modal');
            }

            const showModals = document.getElementsByClassName('show-modal');
            for (let i = 0; i < showModals.length; i++) {
                const openModal = showModals[i];
                openModal.classList.remove('show-modal');
            }            
            document.body.classList.remove("modal-open");

        }
    }


    // testing below
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    window.requestNekos = requestNekos;
    // testing above

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});