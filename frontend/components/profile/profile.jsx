import React from 'react';
import { Route } from 'react-router-dom';
import TimelineHeader from './timeline_header/timeline_header';
import TimelineContent from './timeline_content/timeline_content'

class Profile extends React.Component {
    componentDidMount() {
        // debugger
        this.props.requestNeko(this.props.username);
    }

    componentDidUpdate(prevProps) {
        if (this.props.username !== prevProps.username) {
            this.props.requestNeko(this.props.username);
        };
    }

    render () {
        // debugger
        if (!this.props.neko) return <></>;
        return (
            <section className="profile">
                <section className="profile-container">
                    <section className="profile-content">
                        <Route path={`/nekos/${this.props.neko.username}`} render={() => <TimelineHeader neko={this.props.neko}/>}/>
                        <Route exact path={`/nekos/${this.props.neko.username}`} render={() => <TimelineContent neko={this.props.neko} />} />
                    </section>
                </section>
            </section>
        );
    }
}

export default Profile;