import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import ProfileAboutOverview from './profile_about_overview';
import ProfileAboutLiving from './profile_about_living';
import ProfileAboutContact from './profile_about_contact';
import ProfileAboutPlaceholder from './profile_about_placeholder';


class ProfileAbout extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = Object.assign({}, this.props.neko, {location: ""});
        if (this.props.location) this.state.location = this.props.location.name;

        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.requestNeko(this.props.nekoId);
        this.setState(this.props.neko);
        this.setState({ location: "" });
        if (this.props.location) this.setState({location: this.props.location.name});
    }

    componentDidUpdate(prevProps) {
        // debugger
        if (this.props.nekoId !== prevProps.nekoId) {
            this.props.requestNeko(this.props.nekoId);
            this.setState(this.props.neko);
        }

        if (!prevProps.location && this.props.location) {
            this.setState({location: ""});
            if (this.props.location) this.setState({ location: this.props.location.name });
        };
    }

    // handleSubmit(form) {
    //     return e => {
    //         e.preventDefault();
    //         const tempState = Object.assign({}, this.state);
    //         delete tempState.cover_photo;
    //         delete tempState.profile_picture;
    //         delete tempState.selectedCoverPhoto;
    //         this.props.updateNeko(tempState);
    //     }
    // }

    // handleChange(field) {
    //     return e => {
    //         this.setState({[field]: e.target.value});
    //     }
    // }

    render() {
        // debugger
        const { neko, location, canEdit } = this.props;
        if (!neko || (!location && neko.location_id)) return null;

        let pronouns = ["You", "You", "Your", "Yours", "You've"];

        if (!this.props.canEdit) {
            switch(this.props.neko.gender) {
                case "Female":
                    pronouns = ["She", "Her", "Her", "Hers", "She's"];
                    break;
                case "Male":
                    pronouns = ["He", "Him", "His", "His", "He's"];
                    break;
                default:
                    pronouns = ["They", "Them", "Their", "Theirs", "They've"];
            }
        }

        const sectionNames = ["Overview", "Work and Education", `Places ${pronouns[4]} Lived`, "Contact and Basic Info", "Family and Relationships", `Details About ${pronouns[1]}`, "Life Events"];
        const sectionQuery = ["overview", "education", "living", "contact-info", "relationship", "bio", "year-overview"]

        let aboutContent = <ProfileAboutOverview 
                                neko={this.props.neko}
                                location={this.props.location}
                                canEdit={this.props.canEdit} />;

        switch(this.props.aboutSection) {
            case "overview":
                break;
            case "living":
                aboutContent = <ProfileAboutLiving 
                                neko={this.props.neko} 
                                location={this.props.location} 
                                canEdit={this.props.canEdit}
                                updateNeko={this.props.updateNeko} />;
                break;
            case "contact-info":
                aboutContent = <ProfileAboutContact
                    neko={this.props.neko}
                    canEdit={this.props.canEdit}
                    updateNeko={this.props.updateNeko} />;
                break;
            default:
                if (this.props.aboutSection) {
                    console.log(this.props.aboutSection);
                    debugger
                    aboutContent = <ProfileAboutPlaceholder 
                        sectionName={sectionNames[sectionQuery.indexOf(this.props.aboutSection)]} />
                }
                break;
        }

        return (
            <section className="profile-content">
                <section className="about-content">
                    <header className="about-header">
                        <div className="about-logo">
                            <Link to={`/nekos/${this.props.neko.id}/about`}>About</Link>
                        </div>
                    </header>
                    <section className="about-body">
                        <nav className="about-menu">
                            <ul>
                                {
                                    sectionNames.map((name, idx) => (
                                        <li key={name} className={this.props.aboutSection === sectionQuery[idx] ? "selected-section" : "not-selected-section"}>
                                            {
                                                this.props.aboutSection === sectionQuery[idx] ? (
                                                    <div className="section-marker"></div>
                                                ) : ("")
                                            }
                                            <div>
                                                <Link to={`/nekos/${this.props.neko.id}/about?section=${sectionQuery[idx]}`}>
                                                    {name}
                                                </Link>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                        <section className="about-body-content">
                            {aboutContent}
                            {/* <div className="fname-form-container">
                                Name - Currently @{`${neko.fname} ${neko.lname}`}<br />
                                { 
                                    canEdit ? (
                                        <form action="" onSubmit={this.handleSubmit("name")}>
                                            <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange("fname")} />
                                            <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange("lname")} />
                                            <input type="submit" value="Save Changes" />
                                            <button>Cancel</button>
                                        </form>
                                    ) : (<></>)
                                }
                            </div>
                            <br/><br/>
                            <div className="fname-form-container">
                                Location - Currently @{`${location ? location.name : "Not Set"}`}<br />
                                {
                                    canEdit ? (
                                        <form action="" onSubmit={this.handleSubmit("location")}>
                                            <input type="text" name="location" value={this.state.location} onChange={this.handleChange("location")} />
                                            <input type="submit" value="Save Changes" />
                                            <button>Cancel</button>
                                        </form>
                                    ) : (<></>)
                                }
                            </div>
                            <br /><br />
                            <div className="birthday-form-container">
                                Birthday - Currently @{neko.birthday}<br/>
                                {
                                    canEdit ? (
                                        <form action="" onSubmit={this.handleSubmit("birthday")}>
                                            <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleChange("birthday")}/>
                                            <input type="submit" value="Save Changes"/>
                                            <button>Cancel</button>
                                        </form>
                                    ) : (<></>)
                                }
                            </div>
                            
                            <br/><br/>
                            <div className="birthday-form-container">
                                Gender - Currently @{neko.gender}<br />
                                {
                                    canEdit ? (
                                        <form action="" onSubmit={this.handleSubmit("gender")}>
                                            <select name="gender" value={this.state.gender} onChange={this.handleChange("gender")}>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Custom">Custom</option>
                                            </select>
                                            <input type="submit" value="Save Changes" />
                                            <button>Cancel</button>
                                        </form>
                                    ) : (<></>)
                                }
                            </div> */}
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}

export default ProfileAbout;