import React from 'react';
import UserNavContainer from './user_nav_container';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav-bar">
            <nav className="nav-bar-content">
                <div className="nav-logo">
                    <Link to='/newsfeed'><i className="fas fa-cat"></i></Link>
                    <div className="search-bar">
                        <input type="text" placeholder="Search"/>
                        <button className="button"><i className="fa fa-search search-bar" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className="user-nav-container">
                    <UserNavContainer />
                </div>
            </nav>
        </nav>
    );
};

export default Navbar;