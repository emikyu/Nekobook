import React from 'react';
import { Link } from 'react-router-dom';

class TimelineNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.neko);
        this.selectedProfilePhoto = null;

        this.photoUpload = React.createRef();
        this.handlePPChange = this.handlePPChange.bind(this);
        this.showPhotoUpload = this.showPhotoUpload.bind(this);
    }

    handlePPSubmit(e) {
        const ppData = new FormData();
        if (this.selectedProfilePhoto) {
            ppData.append('neko[profile_picture]', this.selectedProfilePhoto, this.selectedProfilePhoto.name);
            this.props.updateNekoPhoto(this.props.neko.id, ppData);
        }
    }

    handlePPChange(e) {
        this.selectedProfilePhoto = e.target.files[0];
        this.handlePPSubmit();
    }

    showPhotoUpload() {
        this.photoUpload.current.click();
    }

    render() {
        const { neko } = this.props;
        return (
            <section className="timeline-navbar-container">
                <div className={`profile-picture ${neko.profile_picture ? "has-profile-picture" : "no-profile-picture"} ${this.props.canEdit ? "has-pointer" : ""}`}>
                    {<img src={neko.profile_picture ? neko.profile_picture : window.nocatpicURL } alt="Profile picture" />}
                    {
                        this.props.canEdit ? (
                            <div onClick={this.showPhotoUpload}>
                                <input type="file" onChange={this.handlePPChange} ref={this.photoUpload} />
                                <ul>
                                    <li>
                                        <i className="fas fa-camera"></i>
                                    </li>
                                    <li>
                                        {neko.profile_picture ? "Update" : "Add Photo"}
                                    </li>
                                </ul>
                            </div>
                        ) : ("")
                    }
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