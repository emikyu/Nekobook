import React from 'react';

class TimelinePhotos extends React.Component {
    render() {
        return (
            <div className="timeline-photos-content">
                <div className="timeline-header">
                    <div className="timeline-photos-header-left">
                        <div className="timeline-header-icon">
                            <i className="far fa-image"></i>
                        </div>
                        <span className="timeline-header-text">
                            Photos
                        </span>
                    </div>
                </div>            
            </div>
        )
    }
}

export default TimelinePhotos;