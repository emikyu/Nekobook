import React from 'react';
import TimelineIntro from './timeline_intro';
import TimelinePhotos from './timeline_photos';
import TimelineFriendsContainer from './timeline_friends_container';
import PostForm from '../../posts/post_form';
import PostIndex from '../../posts/post_index';

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
                    <PostForm showNeko={neko} />
                    <PostIndex showNeko={neko} />
                </div>
            </div>
        )
    }
};

export default TimelineContent;