import React from 'react';

class TimelineContent extends React.Component {

    render() {
        const { neko } = this.props;
        return (
            <div className="profile-content">
                <div className="timeline-content">
                    Nekobook Timeline Content for the great neko currently known as: { this.props.neko.fname } !!
                    <br />Nyon~~ Stay tuned for POSTs and FRANNNNNNNSSSSS<br />
                </div>
            </div>
        )
    }
};

export default TimelineContent;