import React from 'react';
import { Link } from 'react-router-dom';
import FriendRequestsContainer from './friend_requests_container';

// const UserNav = ({currentUser, logout}) => 
class UserNav extends React.Component {
    componentDidMount() {
        this.props.requestNeko(this.props.currentUserId);
    }

    render() {
        const { currentUser, logout } = this.props;
        if (!currentUser.requester_ids) return null;

        const friendRequests = React.createRef();
        const caratDrop = React.createRef();
        const caratIcon = React.createRef();
        const friendIcon = React.createRef();

        const unhideDropdown = (ref, icon) => {
            return () => {
                ref.current.classList.toggle("show-dropdown");
                icon.current.classList.toggle("selected");
            };
        }


        return (
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
                        <li onClick={unhideDropdown(friendRequests, friendIcon)} className={`trigger friend-requests-icon ${currentUser.requester_ids.length > 0 ? "notif-icon" : ""}`}>
                            <i ref={friendIcon} className="fas fa-user-friends trigger trigger-icon"></i>
                            { currentUser.requester_ids.length > 0 ? (
                                <div className="notif-count">
                                    {currentUser.requester_ids.length}
                                </div>
                                ) : ("")
                            }
                            <div ref={friendRequests} className="friend-requests-dropdown triggered-content">
                                <FriendRequestsContainer />
                            </div>
                        </li>
                        {/* LINKS FOR FUTURE FEATURES <li><i className="fas fa-comment"></i></li>
                        <li><i className="fas fa-bell"></i></li> */}
                    </ul>
                </li>
                <div className="nav-divider"></div>
                <li className="admin">
                    <ul className="admin-list">
                        {/* LINK FOR FUTURE FEATURE <li><i className="fas fa-question-circle"></i></li> */}
                        <li onClick={unhideDropdown(caratDrop, caratIcon)} className="trigger carat-icon">
                            <i ref={caratIcon} className="fas fa-caret-down trigger trigger-icon"></i>
                            <div ref={caratDrop} className="carat-dropdown triggered-content">
                                <div className="tooltip"></div>
                                <div className="tooltip-border"></div>
                                <ul>
                                    <li onClick={() => logout()}>
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}
export default UserNav;