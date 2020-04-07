import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

const UserNav = ({currentUser, logout}) => (
    <ul className="user-nav-list">
        <li className="nav-text">
            <Link to={`/nekos/${currentUser.username}`}>{currentUser.name[0].toUpperCase() + currentUser.name.slice(1).toLowerCase()}</Link>
        </li>
        <div className="nav-divider"></div>
        <li className="nav-text">
            <Link to='/newsfeed'>Home</Link>
        </li>
        <div className="nav-divider"></div>
        <li className="nav-text">Create</li>
        <div className="nav-divider"></div>
        <li className="notifications">
            <ul className="notifications-list">
                <li><i className="fas fa-user-friends"></i></li>
                <li><i className="fas fa-comment"></i></li>
                <li><i className="fas fa-bell"></i></li>
            </ul>
        </li>
        <li className="admin">
            <div className="nav-divider"></div>
            <ul className="admin-list">
                <li><i className="fas fa-question-circle"></i></li>
                <li>
                    <a data-tip="React-tooltip" data-event='click focus'><i className="fas fa-caret-down"></i></a>
                    <ReactTooltip globalEventOff='click' place="bottom" className="dropdown-custom-theme" type="light" effect="solid" clickable={true}>
                        <ul>
                            <li onClick={() => logout()}>
                                Log Out
                            </li>
                        </ul>
                    </ReactTooltip>
                </li>
            </ul>
        </li>
    </ul>
);

export default UserNav;