import React from 'react';
import TimelineIntro from './timeline_intro';
import TimelinePhotos from './timeline_photos';
import TimelineFriendsContainer from './timeline_friends_container';
import WallPostFormContainer from '../../posts/wall_post_form_container';
import WallPostIndexContainer from '../../posts/wall_post_index_container';

class TimelineContent extends React.Component {

    render() {
        const { neko } = this.props;
        return (
            <div className="timeline-content">
                <div className="timeline-left">
                    <TimelineIntro showNeko={neko} />
                    <TimelinePhotos showNeko={neko} />
                    <TimelineFriendsContainer />
                </div>
                <div className="timeline-right">
                    <WallPostFormContainer />
                    <WallPostIndexContainer />
                </div>
            </div>
        )
    }
};

export default TimelineContent;