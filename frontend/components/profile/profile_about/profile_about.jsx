import React from 'react';
import { Link } from 'react-router-dom';

class ProfileAbout extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = Object.assign({}, this.props.neko, {location: ""});
        if (this.props.location) this.state.location = this.props.location.name;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // debugger
        this.props.requestNeko(this.props.nekoId);
        this.setState(this.props.neko);
        this.setState({ location: "" });
        // debugger
        if (this.props.location) this.setState({location: this.props.location.name});
        // debugger
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

    handleSubmit(form) {
        return e => {
            // debugger
            e.preventDefault();
            const tempState = Object.assign({}, this.state);
            // debugger
            delete tempState.cover_photo;
            delete tempState.profile_picture;
            delete tempState.selectedCoverPhoto;
            // debugger
            this.props.updateNeko(tempState);
        }
    }

    handleChange(field) {
        return e => {
            this.setState({[field]: e.target.value});
        }
    }

    render() {
        // debugger
        const { neko, location, canEdit } = this.props;
        if (!neko || (!location && neko.location_id)) return null;

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
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Overview</Link></li>
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Work and Education</Link></li>
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Places You've Lived</Link></li>
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Contact and Basic Info</Link></li>
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Family and Relationships</Link></li>
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Details About You</Link></li>
                                <li><Link to={`/nekos/${this.props.neko.id}/about`}>Life Events</Link></li>
                            </ul>
                        </nav>
                        <section className="about-body-content">
                            Hi I'm the content you're meant to show =^-^=
                            { canEdit? "Testing out an update form:" : ""}
                            <br/><br/>

                            <div className="fname-form-container">
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
                            </div>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}

export default ProfileAbout;