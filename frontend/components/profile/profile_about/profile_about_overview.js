import React from 'react';
import { Link } from 'react-router-dom';

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

class ProfileAboutOverview extends React.Component {
    render() {
        const birthday = this.props.neko.birthday.split("-");

        return (
            <section className="about-overview-section">
                <section className="about-overview-content">
                    <div className="about-overview-left">
                        <ul className="overview-list">
                            {
                                !this.props.canEdit ? (
                                    <li>

                                        <div className="show-icon">
                                            <i className="fas fa-home"></i> 
                                        </div>
                                        <div className="has-information">
                                            { this.props.location ? `Lives in ${this.props.location.name}` : "No current city to show" }
                                        </div>
                                    </li>
                                    ) : (
                                        this.props.location ? (
                                            <li>
                                                <div className="show-icon">
                                                    <i className="fas fa-home"></i>
                                                </div>
                                                <div className="has-information">
                                                    Lives in {this.props.location.name}
                                                </div>
                                            </li>
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
                                { this.props.canEdit? (
                                    <Link to={`/nekos/${this.props.neko.id}/about?section=contact-info`}>
                                        Edit your contact and basic info
                                    </Link>
                                 )
                                 : (" ")
                                }
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