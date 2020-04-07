import React from 'react';
import { Link } from 'react-router-dom';

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
                <section className="profile-content">
                    Nekobook Profile for the great neko currently known as: {this.props.neko.name}!!
                    <br />Nyon~~<br />
                    <Link to='/nekos/emily_wu'>Emily</Link>!!
                </section>
            </section>
        );
    }
}

export default Profile;