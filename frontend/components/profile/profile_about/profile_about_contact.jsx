import React from 'react';
import { Link } from 'react-router-dom';
import ProfileAboutItem from './profile_about_item';

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

class ProfileAboutContact extends React.Component {
    constructor(props) {
        super(props);
        this.startingState = {
            id: this.props.neko.id,
        };
        this.state = this.props.neko;
    }

    // IMPLEMENT FOR TMR: USE REACT REF TO HIDE/UNHIDE FORMS (SEE PHOTO UPLOAD EXAMPLE)
    render() {
        const {neko} = this.props;
        const birthday = neko.birthday.split("-");
        return (
            <section className="about-profile-section">
                <section className="about-profile-content about-contact">
                    <div className="about-profile-left">
                        <div className="about-profile-label">CONTACT INFORMATION</div>
                        <ul className="about-profile-list with-label">
                            <li>
                                <div className="contact-left">
                                    Email 
                                </div>
                                <div className="contact-right">
                                    {neko.email}
                                </div>
                            </li>
                        </ul>
                        <div className="about-profile-label">BASIC INFORMATION</div>
                        <ul className="about-profile-list with-label">
                            <li>
                                <div className="contact-left">
                                    Birth Date
                                </div>
                                <div className="contact-right">
                                    {`${months[parseInt(birthday[1]) - 1]} ${parseInt(birthday[2])}`}
                                </div>
                            </li>
                            <li>
                                <div className="contact-left">
                                    Birth Year
                                </div>
                                <div className="contact-right">
                                    {birthday[0]}
                                </div>
                            </li>
                            <li>
                                <div className="contact-left">
                                    Gender
                                </div>
                                <div className="contact-right">
                                    {neko.gender}
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        );
    }
}

export default ProfileAboutContact;