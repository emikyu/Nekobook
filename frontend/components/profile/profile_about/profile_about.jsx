import React from 'react';

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

    handleCPChange(e) {
        console.log(e.target.files);
        this.setState({selectedCoverPhoto: e.target.files[0]});
    }

    handleCPSubmit(e) {
        e.preventDefault();
        const cpData = new FormData();
        if (this.state.selectedCoverPhoto) {
            // debugger
            cpData.append('neko[cover_photo]', this.state.selectedCoverPhoto, this.state.selectedCoverPhoto.name);
        }

        this.props.updateNekoPhoto(this.props.neko.id, Object.assign(cpData, {fname: this.props.neko.fname}));
    }

    render() {
        // debugger
        const { neko, location, canEdit } = this.props;
        if (!neko || (!location && neko.location_id)) return null;

        return (
            <section className="profile-content">
                <section className="about-content">
                    <header className="about-header">
                        About {neko.fname} !!
                    </header>
                    Hi check out below the body for the stuff about {neko.fname} yay~
                    <section className="about-body">
                        <nav className="about-menu">
                            <ul>
                                <li>Overview</li>
                                <li>Work and Education</li>
                                <li>Places You've Lived</li>
                                <li>Contact and Basic Info</li>
                                <li>Family and Relationships</li>
                                <li>Details About You</li>
                                <li>Life Events</li>
                            </ul>
                        </nav>
                        <section className="about-body-content">
                            Hi I'm the content you're meant to show =^-^=
                            { canEdit? "Testing out an update form:" : ""}
                            <br/><br/>
                            {
                                canEdit ? (
                                    <div className="cover-photo-form-container">
                                        Use this form to update your cover photo!!! ^^
                                        <form action="" onSubmit={this.handleCPSubmit.bind(this)}>
                                            <input type="file" onChange={this.handleCPChange.bind(this)}/>
                                            <input type="submit" value="Update Cover Photo!"/>
                                        </form>
                                    </div>
                                ) : (<></>)
                            }
                                

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