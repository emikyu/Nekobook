import React from 'react';
import {Link} from 'react-router-dom';

class FriendRequests extends React.Component {
    componentDidMount() {
        this.props.requestNekos(this.props.currentUser.id, 'requesters')
            .then(() => this.props.requestNeko(this.props.currentUser.id))
    }

    componentDidUpdate(prevProps) {
        // debugger
        if (this.props.currentUser.requester_ids.length !== prevProps.currentUser.requester_ids.length) {
            this.props.requestNekos(this.props.currentUser.id, 'requesters')
                .then(() => this.props.requestNeko(this.props.currentUser.id))
        }
    }

    render() {
        if (!this.props.currentUser || !this.props.requesters || (this.props.requesters.length > 0 && this.props.requesters.some(requester => !requester))) return null;
        const {currentUser, removeFriendRequest, toFriend} = this.props;
        return (
            <>
                <div className="tooltip"></div>
                <div className="tooltip-border"></div>
                <div className="requests-header">
                    Friend Requests
                </div>
                <div>
                    <ul className="requester-list">
                        {
                            this.props.requesters.map(requester => (
                               <li key={requester.id}>
                                    <div className="requester-info">
                                        <div className="requester-photo">
                                            <Link to={`/nekos/${requester.id}`}>
                                                {<img src={requester.profile_picture ? requester.profile_picture : window.nocatpicURL} alt={`${requester.fname} ${requester.lname}`} />}
                                            </Link>
                                        </div>
                                        <div className="requester-name-container">
                                            <div className="requester-name">
                                                <Link to={`/nekos/${requester.id}`}>
                                                    {requester.fname} {requester.lname}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="requester-button">
                                        <button onClick={() => toFriend(currentUser.id, requester.id)} className="confirm-button">Confirm</button>
                                        <button onClick={() => removeFriendRequest(requester.id, currentUser.id)} className="delete-button">Delete</button>
                                    </div>

                               </li> 
                            ))
                        }
                        {this.props.requesters.length === 0 ? <li>No incoming friend requests at this time</li> : ""}
                    </ul>
                </div>
            </>
        )
    }
}

export default FriendRequests;