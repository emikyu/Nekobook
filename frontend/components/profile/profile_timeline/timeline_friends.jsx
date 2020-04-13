import React from 'react';
import { Link } from 'react-router-dom';

class TimelineFriends extends React.Component {
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
            <div className="timeline-friends-content">
                <div className="timeline-header">
                    <div className="timeline-friends-header-left">
                        <div className="timeline-header-icon">
                            <Link to={`/nekos/${this.props.neko.id}/friends`}>
                                <i className="fas fa-user-friends"></i>
                            </Link>
                        </div>
                        <span className="timeline-header-text">
                            <Link to={`/nekos/${this.props.neko.id}/friends`}>
                                Friends
                            </Link>
                        </span>
                        { this.props.friends.length > 0 ? (<>
                            <span className="dot"> - 
                            </span>
                            <span className="timeline-header-subtext">
                                <Link to={`/nekos/${this.props.neko.id}/friends`}>
                                    {this.props.friends.length}
                                </Link>
                            </span></>
                            ) : ("")
                        }
                    </div>
                </div>
                <ul className="timeline-friends-list">
                {
                    this.props.friends.length > 0 ? (
                        <>
                            {
                                this.props.friends.slice(0, Math.min(9, this.props.friends.length)).map(friend => (
                                        <li key={friend.id}>
                                            <div className="friend-info">
                                                <div className="friend-photo">
                                                    <Link to={`/nekos/${friend.id}`}>
                                                        {<img src={friend.profile_picture ? friend.profile_picture : window.nocatpicURL} alt={`${friend.fname} ${friend.lname}`} />}
                                                    </Link>
                                                </div>
                                                <div className="friend-name timeline">
                                                    <Link to={`/nekos/${friend.id}`}>
                                                        {friend.fname} {friend.lname}
                                                    </Link>
                                                </div>
                                            </div>
                                            
                                        </li>
                                    ))
                                }
                    </>) : ("")
                }
                </ul>
            </div>
        );
    }
}

export default TimelineFriends;