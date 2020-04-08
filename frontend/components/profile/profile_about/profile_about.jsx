import React from 'react';

class ProfileAbout extends React.Component {
    render() {
        const { neko } = this.props;
        return (
            <div className="profile-content">
                <div className="about-content">
                    Nekobook About page for {neko.fname} !!
                </div>
            </div>
        )
    }
}

export default ProfileAbout;