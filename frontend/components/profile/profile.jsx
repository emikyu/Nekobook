import React from 'react';
import { Route } from 'react-router-dom';
import TimelineHeader from './timeline_header/timeline_header';
import TimelineContent from './profile_timeline/timeline_content';
import ProfileAboutContainer from './profile_about/profile_about_container';
import ProfileFriendsContainer from './profile_friends/profile_friends_container';


class Profile extends React.Component {
    componentDidMount() {
        this.props.requestNeko(this.props.nekoId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.nekoId !== prevProps.nekoId) {
            this.props.requestNeko(this.props.nekoId);
        };
    }

    render () {
        // debugger
        if (!this.props.neko || this.props.canEdit === undefined) return <></>;
        return (
            <section className="profile">
                <section className="profile-container">
                    <section className="profile-content">
                        <Route path={'/nekos/:nekoId'} render={() => <TimelineHeader neko={this.props.neko} updateNekoPhoto={this.props.updateNekoPhoto} canEdit={this.props.canEdit}/>}/>
                        <Route exact path={'/nekos/:nekoId'} render={() => <TimelineContent neko={this.props.neko} updateNeko={this.props.updateNeko} canEdit={this.props.canEdit} requestNeko={this.props.requestNeko}/>}/>
                        <Route exact path={`/nekos/:nekoId/about`} component={ProfileAboutContainer} />
                        <Route exact path={`/nekos/:nekoId/friends`} component={ProfileFriendsContainer} />
                    </section>
                </section>
            </section>
        );
    }
}

export default Profile;