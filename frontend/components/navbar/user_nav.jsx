import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import FriendRequestsContainer from './friend_requests_container';

const UserNav = ({currentUser, logout}) => (
    <ul className="user-nav-list">
        <li className="nav-text-profile">
            <Link to={`/nekos/${currentUser.id}`}>
                <div className="user-nav-profile-picture">
                    {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt="Profile picture" />}
                </div>
                <div>{currentUser.fname[0].toUpperCase() + currentUser.fname.slice(1).toLowerCase()}</div>
            </Link>
        </li>
        <div className="nav-divider"></div>
        <li className="nav-text">
            <Link to='/newsfeed'>Home</Link>
        </li>
        <div className="nav-divider"></div>
        <li className="nav-text">
            <a href="https://github.com/emikyu">Github</a>
        </li>
        <div className="nav-divider"></div>
        <li className="notifications">
            <ul className="notifications-list">
                <li className="friend-requests-icon"><i className="fas fa-user-friends"></i>
                    <FriendRequestsContainer />
                </li>
                <li><i className="fas fa-comment"></i></li>
                <li><i className="fas fa-bell"></i></li>
            </ul>
        </li>
        <div className="nav-divider"></div>
        <li className="admin">
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