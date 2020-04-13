import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import FriendRequestButtonContainer from '../timeline_header/friend_request_button_container';

class ProfileFriends extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestNekos(this.props.nekoId, 'friends')
            .then(() => this.props.requestNeko(this.props.nekoId))
    }

    componentDidUpdate(prevProps) {
        if (this.props.nekoId !== prevProps.nekoId) {
            this.props.requestNekos(this.props.nekoId, 'friends')
                .then(() => this.props.requestNeko(this.props.nekoId))
        }
    }

    render() {
        if (!this.props.neko || !this.props.friends || (this.props.friends.length > 0 && this.props.friends.some(friend => !friend))) return null;
        // debugger
        return (
            <section className="profile-content">
                <section className="friends-content">
                    <header className="friends-header">
                        <div className="friends-logo">
                            <img src={window.shadowcatURL} alt="Friends logo" />
                            <Link to={`/nekos/${this.props.neko.id}/friends`}>Friends</Link>
                        </div>
                    </header>
                    <section className="friends-body">
                        {/* Hello from the body section of Friends! ^^ */}
                        <ul className="friends-list">
                        {
                            this.props.friends.length > 0 ? (
                                // <ul className="friends-list">
                                <>
                                    {
                                        this.props.friends.map(friend => (
                                                <li key={friend.id}>
                                                    <div className="friend-info">
                                                        <div className="friend-photo">
                                                            <Link to={`/nekos/${friend.id}`}>
                                                                {<img src={friend.profile_picture ? friend.profile_picture : window.nocatpicURL} alt={`${friend.fname} ${friend.lname}`} />}
                                                            </Link>
                                                        </div>
                                                        <div className="friend-name-container">
                                                            <div className="friend-name">
                                                                <Link to={`/nekos/${friend.id}`}>
                                                                    {friend.fname} {friend.lname}
                                                                </Link>
                                                            </div>
                                                            <div className="friend-count">
                                                                <Link to={`/nekos/${friend.id}/friends`}>
                                                                    {friend.friend_ids.length} { friend.friend_ids.length > 1 ? "friends" : "friend" }
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="friend-button">
                                                        <FriendRequestButtonContainer nekoId={friend.id} renderedAt="profile-friends"/>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    {/* </ul> */}
                            </>) : (
                                <div className="no-friends">
                                    No friends to show
                                    
                                </div>)
                        }
                        </ul>
                    </section>
                </section>
            </section>
        )
    }
}

export default ProfileFriends;