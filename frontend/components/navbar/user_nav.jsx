import React from 'react';

const UserNav = ({logout}) => (
    <>
        <button onClick={e => logout()}>Log Out</button>
    </>
);

export default UserNav;