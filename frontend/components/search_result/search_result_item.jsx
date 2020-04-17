import React from 'react';
import FriendRequestButtonContainer from '../profile/timeline_header/friend_request_button_container';
import { NavLink, Link } from 'react-router-dom';

export default ({neko}) => (
    <div className="search-result-item">
        <div className="friend-info">
            <div className="friend-photo">
                <Link to={`/nekos/${neko.id}`}>
                    {<img src={neko.profile_picture ? neko.profile_picture : window.nocatpicURL} alt={`${neko.fname} ${neko.lname}`} />}
                </Link>
            </div>
            <div className="friend-name-container">
                <div className="friend-name">
                    <Link to={`/nekos/${neko.id}`}>
                        {neko.fname} {neko.lname}
                    </Link>
                </div>
                <div className="friend-count">
                    <Link to={`/nekos/${neko.id}/friends`}>
                        {neko.friend_ids.length} {neko.friend_ids.length === 1 ? "friend" : "friends"}
                    </Link>
                </div>
            </div>
        </div>
        <div className="friend-button">
            <FriendRequestButtonContainer nekoId={neko.id} renderedAt="profile-friends" />
        </div>
    </div>
);