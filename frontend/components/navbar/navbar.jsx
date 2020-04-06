import React from 'react';
import UserNavContainer from './user_nav_container';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-logo">
                Nekobook: Heeeheeeee I has Navbar now........
            </div>
            <div className="user-nav-container">
                <UserNavContainer />
            </div>
        </nav>
    );
};

export default Navbar;