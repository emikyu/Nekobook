import React from 'react';
import { Link } from 'react-router-dom';

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

class ProfileAboutOverview extends React.Component {
    render() {
        const birthday = this.props.neko.birthday.split("-");

        return (
            <section className="about-profile-section">
                <section className="about-profile-content">
                    <div className="about-overview-left">
                        <ul className="about-profile-list">
                            {
                                !this.props.canEdit ? (
                                    <Link to={`/nekos/${this.props.neko.id}/about?section=living`}>
                                        <li className="has-information">

                                            <div className="show-icon">
                                                <i className="fas fa-home"></i> 
                                            </div>
                                            <div className="has-information">
                                                { this.props.location ? `Lives in ${this.props.location.name}` : "No current city to show" }
                                            </div>
                                        </li>
                                    </Link>
                                    ) : (
                                        this.props.location ? (
                                            <Link to={`/nekos/${this.props.neko.id}/about?section=living`}>
                                                <li className="has-information">
                                                    <div className="show-icon">
                                                        <i className="fas fa-home"></i>
                                                    </div>
                                                        <div className="has-information">
                                                            <div>Lives in {this.props.location.name}</div>
                                                            <div><span>Edit the places you've lived</span></div>
                                                        </div>
                                                </li>
                                            </Link>
                                        ) : (
                                                <Link to={`/nekos/${this.props.neko.id}/about?section=living`}>
                                                    <li>
                                                        <div className="hide-icon">
                                                            <i className="fas fa-plus"></i>
                                                        </div>
                                                        <div className="need-information">
                                                            Add your current city
                                                        </div>
                                                    </li>
                                                </Link>
                                        )
                                    )
                                
                            }
                        </ul>
                    </div>
                    <div className="about-overview-right">
                        <Link to={`/nekos/${this.props.neko.id}/about?section=contact-info`}>
                        <ul className="overview-right-list">
                            <li>
                                <div className="overview-right-icon">
                                    <i className="fas fa-birthday-cake"></i>
                                </div>
                                <div className="overview-right-text">
                                    {`${months[parseInt(birthday[1])-1]} ${parseInt(birthday[2])}, ${birthday[0]}`}
                                </div>
                            </li>
                            <li> </li>
                            <li> </li>
                            <li className="about-overview-right-edit">
                                <p>{ this.props.canEdit? ( "Edit your contact and basic info") : (" ")}</p>
                            </li>
                        </ul>
                        </Link>
                    </div>
                </section>
            </section>
        );
    }
}

export default ProfileAboutOverview;