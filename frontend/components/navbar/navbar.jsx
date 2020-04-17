import React from 'react';
import UserNavContainer from './user_nav_container';
import { Link } from 'react-router-dom';
import SearchBarContainer from './search_bar_container';

const Navbar = () => {
    return (
        <nav className="nav-bar">
            <nav className="nav-bar-content">
                <div className="nav-logo">
                    <Link to='/newsfeed'><i className="fas fa-cat"></i></Link>

                    <SearchBarContainer />
                </div>
                <div className="user-nav-container">
                    <UserNavContainer />
                </div>
            </nav>
        </nav>
    );
};

export default Navbar;