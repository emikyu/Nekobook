import React from 'react';
import { Route } from 'react-router-dom';
import TimelineHeader from './timeline_header/timeline_header';
import TimelineContent from './timeline_content/timeline_content';
import ProfileAboutContainer from './profile_about/profile_about_container';

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
        if (!this.props.neko) return <></>;
        return (
            <section className="profile">
                <section className="profile-container">
                    <section className="profile-content">
                        <Route path={'/nekos/:nekoId'} render={() => <TimelineHeader neko={this.props.neko}/>}/>
                        <Route exact path={'/nekos/:nekoId'} render={() => <TimelineContent neko={this.props.neko} />} />
                        <Route exact path={`/nekos/:nekoId/about`} component={ProfileAboutContainer} />
                    </section>
                </section>
            </section>
        );
    }
}

export default Profile;