import React from 'react';

class TimelineCoverPhoto extends React.Component {

    render() {
        const { neko } = this.props;
        return (
            <section className="timeline-photos-container">
                Hello from Timeline Cover Photo ^^ for {neko.name}
                <div className={`cover-image ${neko.cover_photo ? "has-cover-image" : "no-cover-image"}`}>
                    {<img src={neko.cover_photo} alt="Cover photo" />}
                </div>
            </section>
        )
    }
};

export default TimelineCoverPhoto;