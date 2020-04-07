import React from 'react';

class Profile extends React.Component {
    componentDidMount() {
        this.props.requestNeko(this.props.nekoId);
    }
    render () {
        if (!this.props.neko) return null;
        return (
            <section className="profile">
                <section className="profile-content">
                    Nekobook Profile for the great neko currently known as: {this.props.neko.name}!!
                    <br />Nyon~~
                </section>
            </section>
        );
    }
}

export default Profile;