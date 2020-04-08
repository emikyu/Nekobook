import React from 'react';
import TimelineNavbar from './timeline_navbar';
import TimelineCoverPhoto from './timeline_cover_photo';

const TimelineHeader = ({neko}) => (
    <section className="profile-component">
        {/* Hewooooo from Timeline Header desuuuuu */}
        <TimelineCoverPhoto neko={neko} />
        <TimelineNavbar neko={neko} />
    </section>
);

export default TimelineHeader;