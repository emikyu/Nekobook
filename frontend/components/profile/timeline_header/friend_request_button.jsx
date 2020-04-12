import React from 'react';
import { useHistory } from 'react-router-dom';

const FriendRequestButton = ( { showNekoId, currentUserId, requesterIds, requesteeIds, makeFriendRequest, removeFriendRequest } ) => {
    const history = useHistory();
    
    let buttonText = (<><i className="fas fa-user-plus"></i> Add Friend</>);
    let buttonClick = () => makeFriendRequest(currentUserId, showNekoId);
    let listTexts = [];
    let handleClicks = [];
    
    if (showNekoId == currentUserId) {
        buttonText = (<><i className="fas fa-pen"></i> Edit Profile</>);
        buttonClick = () => history.push(`/nekos/${currentUserId}/about`);
    } else if (requesterIds.includes(showNekoId)) {
        buttonText = (<><i className="fas fa-user-plus"></i> Respond to Friend Request</>);
        buttonClick = null;
        listTexts = ["Confirm", "Delete Request"];
        handleClicks = [() => removeFriendRequest(showNekoId, currentUserId),
                        () => removeFriendRequest(showNekoId, currentUserId)];
    } else if (requesteeIds.includes(showNekoId)) {
        buttonText = (<><i className="fas fa-user-plus"></i> Friend Request Sent</>);
        buttonClick = null;
        listTexts = ["Cancel Request"];
        handleClicks = [() => removeFriendRequest(currentUserId, showNekoId)];
    }
    
    // const generateButton = (buttonText, buttonClick, listTexts, handleClicks) => (
    //     <div className="friend-request-button-container">
    //         <button onClick={buttonClick}>
    //             {buttonText}
    //         </button>
    //         <div>
    //             <ul>
    //                 {
    //                     listTexts.map((listText, idx) => (
    //                         <li key={listText} onClick={handleClicks[idx]}>
    //                             {listText}
    //                         </li>
    //                     ))
    //                 }
    //             </ul>
    //         </div>
    //     </div>
    // );

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
    );
};

export default FriendRequestButton;