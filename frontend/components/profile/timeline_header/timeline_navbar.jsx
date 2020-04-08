import React from 'react';
import { Link } from 'react-router-dom';

class TimelineNavbar extends React.Component {

    render() {
        const { neko } = this.props;
        return (
            <section className="timeline-navbar-container">
                <div className='profile-picture'>
                    {<img src={neko.profile_picture ? neko.profile_picture : window.nocatpicURL } alt="Profile picture" />}
                    <div>
                        {neko.profile_picture ? "Update" : "Add Photo"}
                    </div>
                </div>
                <div className="profile-name">
                    {`${neko.fname} ${neko.lname}`}
                </div>
                <div className="timeline-navbar">
                    <ul>
                        <Link to={`/nekos/${neko.id}`}>
                            <li>
                                    Timeline
                                    <i className="fas fa-caret-down"></i>
                            </li>
                        </Link>

                        <Link to={`/nekos/${neko.id}/about`}>
                            <li>
                                About
                            </li>
                        </Link>
                        <li>Friends</li>
                        <li>Photos</li>
                        <li><i className="fas fa-lock"></i>Archive</li>
                        <li>More<i className="fas fa-caret-down"></i></li>
                    </ul>
                </div>
            </section>
        )
    }
};

export default TimelineNavbar;