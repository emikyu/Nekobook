import React from 'react';

class FriendRequestButton extends React.Component {
    componentDidMount() {
        this.props.requestNeko(this.props.showNekoId);
        this.props.requestNeko(this.props.currentUserId);
    }

    render() {
        const { showNekoId, currentUserId, requesterIds, requesteeIds, friendIds, makeFriendRequest, removeFriendRequest, toFriend, toUnfriend } = this.props;
        
        let buttonText = (<><i className="fas fa-user-plus"></i> Add Friend</>);
        let buttonClick = () => makeFriendRequest(currentUserId, showNekoId);
        let listTexts = [];
        let handleClicks = [];
        
        // if on own profile - allow edit profile
        if (showNekoId == currentUserId) {
            buttonText = (<><i className="fas fa-pen"></i> Edit Profile</>);
            buttonClick = () => this.props.history.push(`/nekos/${currentUserId}/about`);
        } 
        // if already friends with shown user - allow unfriending
        else if (friendIds.includes(showNekoId)) {
            buttonText = (<><i className="fas fa-star"></i> Friends <i className="fas fa-caret-down"></i></>);
            buttonClick = null;
            listTexts = ["Unfriend"];
            handleClicks = [() => toUnfriend(currentUserId, showNekoId)];
        } 
        // if have incoming friend request from user - either confirm (friend) or delete request (reject request)
        else if (requesterIds.includes(showNekoId)) {
            buttonText = (<><i className="fas fa-user-plus"></i> Respond to Friend Request</>);
            buttonClick = null;
            listTexts = ["Confirm", "Delete Request"];
            handleClicks = [() => toFriend(currentUserId, showNekoId),
                            () => removeFriendRequest(showNekoId, currentUserId)];
        }
        // if have pending outgoing request to user - can cancel request
        else if (requesteeIds.includes(showNekoId)) {
            buttonText = (<><i className="fas fa-user-plus"></i> Friend Request Sent</>);
            buttonClick = null;
            listTexts = ["Cancel Request"];
            handleClicks = [() => removeFriendRequest(currentUserId, showNekoId)];
        }

        return (
            <div className="friend-request-button-container">
                <button onClick={buttonClick}>
                    {buttonText}
                </button>
                {listTexts.length > 0 ? (<>
                <div className="tooltip"></div>
                <div className="invisible-border">
                    <div>
                    </div>
                    <div>
                        <ul>
                            {
                                listTexts.map((listText, idx) => (
                                    <li key={listText} onClick={handleClicks[idx]}>
                                        {listText}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div></>
                ) : ("")}
            </div>
        )
    };
}

export default FriendRequestButton;