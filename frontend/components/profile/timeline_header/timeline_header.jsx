import React from 'react';
import TimelineNavbar from './timeline_navbar';
import TimelineCoverPhoto from './timeline_cover_photo';

const TimelineHeader = ({neko, updateNekoPhoto, canEdit}) => (
    <section className="profile-component">
        <TimelineCoverPhoto neko={neko} updateNekoPhoto={updateNekoPhoto} canEdit={canEdit}/>
        <TimelineNavbar neko={neko} updateNekoPhoto={updateNekoPhoto} canEdit={canEdit}/>
    </section>
);

export default TimelineHeader;