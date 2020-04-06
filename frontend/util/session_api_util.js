// signing up new user
export const signup = (neko) => (
    $.ajax({
        method: 'post',
        url: '/api/nekos',
        data: { neko }
    })
);

// logging into account / create new session
export const login = (neko) => (
    $.ajax({
        method: 'post',
        url: '/api/session',
        data: { neko }
    })
);

// logging out of account
export const logout = () => (
    $.ajax({
        method: 'delete',
        url: '/api/session'
    })
);